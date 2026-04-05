# MONITORING ARCHITECTURE v1.0

> Definerer logging, error tracking, performance monitoring og alerting for Kit CC

**Formål:** Sikre full observerbarhet av produksjonssystemet for rask problem-deteksjon og debugging.

**Target:** <1 min MTTR (Mean Time To Recovery), 99.9% uptime, zero undetected errors.

---

## OVERSIKT

### Monitoring Stack

```
┌──────────────────────────────────────────────────────────┐
│              Application Code                             │
│  - Frontend (Next.js)                                    │
│  - API (Next.js API Routes)                              │
│  - Database (Supabase/PostgreSQL)                        │
└──────────────────────┬───────────────────────────────────┘
                       │ Instrumentation
        ┌──────────────┼──────────────┬──────────────┐
        ↓              ↓              ↓              ↓
    ┌────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
    │Logging │  │ Tracing  │  │ Metrics  │  │Errors    │
    │(Logs)  │  │ (Traces) │  │(Metrics) │  │(Sentry)  │
    └───┬────┘  └────┬─────┘  └────┬─────┘  └─────┬────┘
        │            │             │              │
        └────────────┼─────────────┼──────────────┘
                     ↓
        ┌──────────────────────────┐
        │  Data Aggregation Layer  │
        │  (Datadog/CloudWatch)    │
        └────────────┬─────────────┘
                     ↓
        ┌──────────────────────────┐
        │  Monitoring & Analysis   │
        │  - Dashboards            │
        │  - Alerts                │
        │  - Reports               │
        └────────────┬─────────────┘
                     ↓
        ┌──────────────────────────┐
        │  Notifications           │
        │  - Slack                 │
        │  - Email                 │
        │  - PagerDuty (on-call)   │
        └──────────────────────────┘
```

---

## 1. LOGGING-STRATEGI

### 1.1 Logging Levels

```
DEBUG    - Detailed debugging info (dev only)
INFO     - Application events, deployments, user actions
WARN     - Warnings that don't prevent functionality
ERROR    - Errors that need attention
FATAL    - Critical system failures
```

### 1.2 Logger Setup

**File:** `src/utils/logger.ts`

```typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'kit-cc',
    environment: process.env.NODE_ENV,
    version: process.env.APP_VERSION
  },
  transports: [
    // Console (all environments)
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),

    // File (production)
    ...(process.env.NODE_ENV === 'production'
      ? [
          new winston.transports.File({
            filename: '/var/log/kit-cc/error.log',
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5
          }),
          new winston.transports.File({
            filename: '/var/log/kit-cc/combined.log',
            maxsize: 5242880,
            maxFiles: 10
          })
        ]
      : [])
  ]
});

export default logger;
```

### 1.3 What to Log

#### Application Events

```typescript
// User authentication
logger.info('User logged in', {
  userId: user.id,
  email: user.email,
  timestamp: new Date()
});

// User actions
logger.info('User created document', {
  userId: user.id,
  documentId: doc.id,
  documentTitle: doc.title
});

// Deployment events
logger.info('Deployment started', {
  environment: 'production',
  version: '1.0.0',
  triggeredBy: 'github-actions'
});
```

#### Errors and Exceptions

```typescript
// Log with context
logger.error('Database query failed', {
  query: 'SELECT * FROM users WHERE id = $1',
  params: [userId],
  error: error.message,
  stack: error.stack,
  duration: 250 // ms
});

// API errors
logger.error('API request failed', {
  method: 'POST',
  endpoint: '/api/users',
  statusCode: 500,
  error: error.message,
  clientIP: request.ip,
  userId: request.user?.id
});
```

#### Performance Metrics

```typescript
// Request timing
logger.info('Request completed', {
  method: 'GET',
  path: '/api/posts',
  statusCode: 200,
  duration: 125, // ms
  userId: user?.id
});

// Database query performance
logger.info('Database query', {
  query: 'SELECT * FROM posts WHERE userId = $1',
  duration: 45, // ms
  rows: 10
});
```

### 1.4 Structured Logging Format

```json
{
  "timestamp": "2026-02-05T12:30:45.123Z",
  "level": "info",
  "message": "User logged in",
  "service": "kit-cc",
  "environment": "production",
  "version": "1.0.0",
  "context": {
    "userId": "usr_12345",
    "email": "user@example.com",
    "ipAddress": "192.168.1.1",
    "userAgent": "Mozilla/5.0..."
  },
  "duration": 125,
  "traceId": "trace_xyz789"
}
```

---

## 2. ERROR TRACKING

### 2.1 Sentry Setup

**File:** `sentry.config.ts`

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true
    })
  ],
  denyUrls: [
    // Browser extensions
    /extensions\//i,
    /^chrome:\/\//i,
    // Third-party scripts
    /analytics\.google\.com/i,
    /cdn\.segment\.com/i
  ]
});
```

### 2.2 Error Capture

#### Frontend Errors

```typescript
// React component error boundary
import * as Sentry from '@sentry/react';

export const ErrorBoundary = Sentry.withErrorBoundary(
  MyComponent,
  {
    fallback: <ErrorFallback />,
    showDialog: true,
    onError: (error) => {
      console.error('Error captured:', error);
    }
  }
);

// Async errors
window.addEventListener('unhandledrejection', event => {
  Sentry.captureException(event.reason);
});
```

#### API Errors

```typescript
// API route error handling
import * as Sentry from '@sentry/nextjs';

export default async function handler(req, res) {
  try {
    const data = await fetchData();
    res.status(200).json(data);
  } catch (error) {
    Sentry.captureException(error, {
      contexts: {
        api: {
          method: req.method,
          path: req.url,
          query: req.query,
          body: req.body
        }
      }
    });

    res.status(500).json({ error: 'Internal server error' });
  }
}
```

### 2.3 Error Severity Levels

```
FATAL     - System down, immediate action required
ERROR     - Feature broken, user impacted
WARNING   - Degraded performance, user may notice
INFO      - Non-critical issues
DEBUG     - Development information only
```

### 2.4 Error Grouping

Errors automatically grouped by:
- Error type (e.g., TypeError, NetworkError)
- Stack trace
- Source file and line number
- Context (endpoint, component, etc.)

---

## 3. PERFORMANCE MONITORING

### 3.1 Web Vitals

**File:** `src/utils/web-vitals.ts`

```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export function reportWebVitals(metric: any) {
  // Send to analytics service
  console.log(metric);

  // Example: Send to custom endpoint
  navigator.sendBeacon('/api/metrics', JSON.stringify(metric));
}

// Initialize in _app.tsx
getCLS(reportWebVitals);
getFID(reportWebVitals);
getFCP(reportWebVitals);
getLCP(reportWebVitals);
getTTFB(reportWebVitals);
```

### 3.2 Core Web Vitals Targets

```
LCP (Largest Contentful Paint)     ≤ 2.5s  (how quickly page appears)
FID (First Input Delay)             ≤ 100ms (how responsive)
CLS (Cumulative Layout Shift)       ≤ 0.1   (how stable)
TTFB (Time To First Byte)           ≤ 600ms (server response time)
```

### 3.3 Custom Performance Metrics

```typescript
// API response time
const start = performance.now();
const response = await fetch('/api/data');
const duration = performance.now() - start;

reportMetric('api_response_time', duration, {
  endpoint: '/api/data',
  method: 'GET',
  status: response.status
});

// Database query time
const queryStart = performance.now();
const result = await db.query(sql);
const queryDuration = performance.now() - queryStart;

reportMetric('db_query_time', queryDuration, {
  table: 'users',
  operation: 'SELECT'
});
```

### 3.4 Real User Monitoring (RUM)

**Tool:** Datadog RUM

```typescript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  applicationId: 'app-id',
  clientToken: 'client-token',
  site: 'datadoghq.com',
  service: 'kit-cc',
  env: process.env.NODE_ENV,
  version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100
});

datadogRum.startSessionReplayRecording();
```

---

## 4. ALERTING-OPPSETT

### 4.1 Alert Channels

```
CRITICAL  → PagerDuty (page on-call engineer)
ERROR     → Slack #alerts
WARNING   → Slack #warnings
INFO      → Email (daily digest)
```

### 4.2 Alert Rules

#### Critical Alerts (Page immediately)

```yaml
Alert: Application Down
- Trigger: HTTP 500+ error rate > 10% for 5 minutes
- Action: Page on-call via PagerDuty
- Threshold: 10% error rate
- Window: 5 minutes

Alert: Database Connection Error
- Trigger: Database connection failures > 50%
- Action: Page on-call
- Auto-remediation: Restart database connection pool

Alert: Security Incident
- Trigger: SQL injection attempt detected
- Action: Page on-call immediately
- Window: Immediate

Alert: Out of Memory
- Trigger: Memory usage > 90%
- Action: Page on-call
- Auto-remediation: Trigger graceful restart
```

#### High Priority Alerts (Slack immediate)

```yaml
Alert: High Error Rate
- Trigger: Error rate > 5% for 10 minutes
- Channel: #alerts
- Threshold: 5%
- Window: 10 minutes

Alert: Slow API Responses
- Trigger: P95 response time > 2 seconds
- Channel: #alerts
- Threshold: 2s
- Window: 5 minutes

Alert: Database Slow Queries
- Trigger: Query taking > 5 seconds
- Channel: #alerts
- Threshold: 5s
```

#### Medium Priority Alerts (Slack)

```yaml
Alert: Deployment Failed
- Trigger: CI/CD pipeline failed
- Channel: #deployments
- Action: Notify team, check logs

Alert: High CPU Usage
- Trigger: CPU > 80% for 10 minutes
- Channel: #alerts
- Threshold: 80%
- Window: 10 minutes
```

### 4.3 Alert Configuration (Datadog)

```yaml
# Critical - Database Down
- name: "Database Connection Failed"
  type: "metric alert"
  query: "avg:postgresql.connections.used{env:prod} > 95"
  threshold: 95
  notify_by: ["pagerduty", "slack"]
  priority: "P1"
  message: |
    Database connection pool exhausted
    @pagerduty-oncall

# High - Error Rate Spike
- name: "High Error Rate"
  type: "metric alert"
  query: "avg:trace.web.request.errors{env:prod} > 5"
  threshold: 5
  comparison: ">"
  aggregation: "avg"
  notify_by: ["slack"]
  priority: "P2"
  channel: "#alerts"

# Medium - Deployment
- name: "Deployment Failed"
  type: "event alert"
  query: "service:kit-cc status:failed"
  notify_by: ["slack"]
  priority: "P3"
  channel: "#deployments"
```

---

## 5. DASHBOARD-ANBEFALINGER

### 5.1 Main Dashboard

**Purpose:** High-level system health overview

```
┌─────────────────────────────────────────────┐
│  System Health Dashboard (Real-time)        │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │ Status: HEALTHY                      │  │
│  │ Uptime: 99.98% (last 30 days)        │  │
│  └──────────────────────────────────────┘  │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐ │
│  │ Requests │  │  Errors  │  │  Users   │ │
│  │  1.2k/s  │  │    0.1%  │  │  45.3k   │ │
│  └──────────┘  └──────────┘  └──────────┘ │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │ Error Rate (Last 24h)                │  │
│  │ [Graph showing error trend]          │  │
│  └──────────────────────────────────────┘  │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │ Response Time P95 (Last 24h)         │  │
│  │ [Graph showing response time trend]  │  │
│  └──────────────────────────────────────┘  │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │ Top Errors (Last 1h)                 │  │
│  │ 1. TypeError: Cannot read... (234)   │  │
│  │ 2. Network timeout (145)             │  │
│  │ 3. Invalid token (87)                │  │
│  └──────────────────────────────────────┘  │
│                                             │
└─────────────────────────────────────────────┘
```

**Key Metrics:**
- Overall health status
- Uptime percentage
- Request rate (req/sec)
- Error rate (%)
- Current active users
- Top errors
- Response time trends

### 5.2 Performance Dashboard

```
┌─────────────────────────────────────────────┐
│  Performance Monitoring                     │
├─────────────────────────────────────────────┤
│                                             │
│  API Performance                            │
│  ├─ Response Time P50: 125ms               │
│  ├─ Response Time P95: 850ms               │
│  ├─ Response Time P99: 2.1s                │
│  └─ Throughput: 1,200 req/s                │
│                                             │
│  Frontend Performance                       │
│  ├─ LCP: 1.8s                             │
│  ├─ FID: 45ms                             │
│  ├─ CLS: 0.05                             │
│  ├─ TTFB: 250ms                           │
│  └─ Total Load Time: 2.3s                 │
│                                             │
│  Database Performance                       │
│  ├─ Query Time P95: 150ms                 │
│  ├─ Connection Pool: 45/100               │
│  ├─ Slow Queries: 2                       │
│  └─ Lock Wait: 0ms                        │
│                                             │
│  Infrastructure                             │
│  ├─ CPU Usage: 35%                        │
│  ├─ Memory Usage: 62%                     │
│  ├─ Disk Usage: 45%                       │
│  └─ Network: 250Mbps                      │
│                                             │
└─────────────────────────────────────────────┘
```

### 5.3 Error Dashboard

```
┌─────────────────────────────────────────────┐
│  Error Analysis & Debugging                 │
├─────────────────────────────────────────────┤
│                                             │
│  Error Trend (Last 7 days)                  │
│  [Line chart showing error rate over time]  │
│                                             │
│  Top 10 Errors                              │
│  1. TypeError (145 errors, ↑ 20%)          │
│     src/pages/api/user.ts:45               │
│     Affects: 1,250 users                   │
│                                             │
│  2. Network Error (89 errors, ↓ 5%)        │
│     Timeout after 30s                      │
│     Affects: 450 users                     │
│                                             │
│  3. Permission Denied (56 errors)          │
│     User lacks required role                │
│     Affects: 200 users                     │
│                                             │
│  Affected Users (Last 24h)                  │
│  Total: 2,450 users (5.4%)                 │
│  Last hour: 145 users                      │
│                                             │
└─────────────────────────────────────────────┘
```

### 5.4 Business Dashboard

```
┌─────────────────────────────────────────────┐
│  Business Metrics & Analytics               │
├─────────────────────────────────────────────┤
│                                             │
│  Daily Active Users (DAU)                   │
│  [Chart: 45.3k today, ↑ 12% vs last week]  │
│                                             │
│  Feature Usage                              │
│  ├─ Documents Created: 2,340               │
│  ├─ Documents Shared: 1,890                │
│  ├─ Comments: 5,230                        │
│  └─ Exports: 340                           │
│                                             │
│  System Health Score                        │
│  [Gauge: 96/100 - Excellent]               │
│  ├─ Availability: 100%                     │
│  ├─ Performance: 94%                       │
│  ├─ Error Rate: 88%                        │
│  └─ User Satisfaction: 96%                 │
│                                             │
│  Conversion Funnel                          │
│  ├─ Sign-ups: 450 → Free users: 420 (93%) │
│  ├─ Free users: 420 → Paid: 45 (11%)      │
│  └─ Conversion Rate: 10%                   │
│                                             │
└─────────────────────────────────────────────┘
```

### 5.5 Deployment Dashboard

```
┌─────────────────────────────────────────────┐
│  Deployment & Release Tracking              │
├─────────────────────────────────────────────┤
│                                             │
│  Current Version: 1.2.3 (Production)       │
│  Last Deployment: 2026-02-05 14:32 UTC    │
│  Deployed by: github-actions               │
│                                             │
│  Recent Deployments                         │
│  ✅ v1.2.3 (Prod) - 2h ago - Status: OK   │
│  ✅ v1.2.2 (Staging) - 1d ago - Status: OK│
│  ✅ v1.2.1 (Dev) - 2d ago - Status: OK    │
│                                             │
│  Deployment Pipeline                        │
│  ┌─────────┐  ┌──────┐  ┌────────┐        │
│  │ Build   │→│ Test │→│ Deploy │        │
│  │ ✅      │  │ ✅   │  │ ✅     │        │
│  │ 2m 15s  │  │3m 45s│  │ 1m 20s │        │
│  └─────────┘  └──────┘  └────────┘        │
│                                             │
│  Incident Timeline                          │
│  No open incidents                          │
│  Last incident: 5 days ago (Resolved)      │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 6. MONITORING TOOLS INTEGRATION

### 6.1 Datadog Setup

```
1. Create Datadog account
2. Install Datadog agent
3. Configure dashboards
4. Set up monitors/alerts
5. Create runbooks
```

### 6.2 Slack Integration

```yaml
Slack channels:
- #alerts          (critical & high priority)
- #warnings        (medium priority)
- #deployments     (deployment events)
- #performance     (performance metrics)
- #incidents       (incident reports)
```

### 6.3 PagerDuty Integration

```yaml
# For on-call escalation
Critical alerts:
- Direct page to on-call engineer
- SMS notification
- Phone call if no response in 5 min
- Escalate to manager if no response in 15 min
```

---

## 7. INCIDENT RESPONSE

### 7.1 Alert Response Workflow

```
Alert Triggered
    ↓
Team Notified (Slack/PagerDuty)
    ↓
On-call Engineer Acknowledges
    ↓
Investigate Root Cause
    ↓
Implement Fix / Rollback
    ↓
Verify Resolution
    ↓
Create Incident Report
    ↓
Post-Mortem (24-48h later)
```

### 7.2 Common Issues & Solutions

#### High Error Rate

```
Detection: Error rate > 5% for 5+ minutes

Investigation:
1. Check error type and frequency
2. Review recent deployments
3. Check infrastructure health (CPU, memory, DB)
4. Review recent code changes

Solutions:
- Rollback to previous version
- Scale up servers
- Optimize slow queries
- Clear cache
```

#### Slow API Responses

```
Detection: P95 response time > 2 seconds

Investigation:
1. Check which endpoints are slow
2. Profile database queries
3. Check external API calls
4. Review server metrics

Solutions:
- Add database indexes
- Optimize N+1 queries
- Implement caching
- Scale database
```

#### Database Connection Pool Exhausted

```
Detection: Connection pool > 95%

Investigation:
1. Check open connections
2. Identify long-running queries
3. Review connection timeouts

Solutions:
- Increase connection pool size
- Kill long-running queries
- Restart connection pool
- Optimize query performance
```

---

## 8. MONITORING CHECKLIST

### Daily

```
☐ Check overall system health
☐ Review error rate trends
☐ Monitor performance metrics
☐ Check active alert count
```

### Weekly

```
☐ Review incident reports
☐ Analyze error patterns
☐ Performance trend analysis
☐ Update dashboards
☐ Test alert notifications
```

### Monthly

```
☐ Full system health review
☐ Capacity planning analysis
☐ Update monitoring rules
☐ Review and update runbooks
☐ Team training on new alerts
```

---

**Versjon:** 1.0.0
**Opprettet:** 2026-02-05
**Formål:** Definere logging, error tracking og monitoring strategi
**Target:** <1 min MTTR, 99.9% uptime, zero undetected errors
