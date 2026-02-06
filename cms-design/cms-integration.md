# YANC CMS Integration Guide

## Overview

This guide provides step-by-step instructions for connecting the YANC website frontend with a headless CMS backend. The integration enables dynamic content management while maintaining robust fallback behavior for when the CMS is unavailable.

## Architecture Overview

### System Components
- **Frontend**: React/TypeScript SPA hosted on Netlify/Render
- **Backend**: Headless CMS with Node.js/Nest.js API
- **Database**: PostgreSQL for structured content
- **Media Storage**: Google Drive for images and videos
- **Communication**: RESTful API endpoints

### Data Flow
```
CMS Admin UI → CMS API → PostgreSQL/Google Drive → Website Frontend
                                      ↓
                                Fallback to Mock Data
```

## Prerequisites

### Required Services
1. **Google Drive Account** - For media storage
2. **PostgreSQL Database** - For content metadata
3. **Domain/Hosting** - For CMS deployment
4. **SSL Certificate** - For secure API communication

### Technical Requirements
- Node.js 18+
- PostgreSQL 13+
- Google Cloud Platform account
- Domain with SSL support

## Step-by-Step Integration Process

### Phase 1: CMS Backend Setup

#### 1.1 Database Configuration
```sql
-- Create database
CREATE DATABASE yanc_cms;

-- Run Prisma migrations
npx prisma migrate dev --name init
npx prisma generate
```

#### 1.2 Google Drive Integration
1. **Create Google Cloud Project**
   - Go to Google Cloud Console
   - Create new project "YANC-CMS"
   - Enable Google Drive API

2. **Setup Service Account**
   ```bash
   # Create service account credentials
   gcloud iam service-accounts create yanc-cms-service
   
   # Grant Drive API access
   gcloud projects add-iam-policy-binding PROJECT_ID \
     --member="serviceAccount:yanc-cms-service@PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/drive.file"
   ```

3. **Folder Structure**
   ```
   YANC-CMS/
   ├── hero-media/
   ├── event-images/
   ├── mentor-talks/
   ├── team-members/
   ├── testimonials/
   └── general-assets/
   ```

#### 1.3 Environment Variables
Create `.env` file in CMS project:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/yanc_cms"

# Google Drive
GOOGLE_DRIVE_SERVICE_ACCOUNT_KEY="path/to/service-account-key.json"
GOOGLE_DRIVE_FOLDER_ID="your-folder-id"

# API Configuration
PORT=3001
JWT_SECRET="your-jwt-secret"
CORS_ORIGIN="https://your-frontend-domain.com"

# Media Settings
MAX_FILE_SIZE=10485760  # 10MB
ALLOWED_FILE_TYPES="image/*,video/*"
```

### Phase 2: Frontend Configuration

#### 2.1 Environment Variables
Update `.env` file in frontend project:
```env
# CMS API Configuration
VITE_CMS_BASE_URL="https://your-cms-api-domain.com"
VITE_CMS_TIMEOUT=10000

# Fallback Behavior
VITE_USE_MOCK_DATA=true  # Set to false when CMS is ready
```

#### 2.2 CMS Service Configuration
The frontend uses a layered approach:
1. **Primary**: Fetch from CMS API
2. **Secondary**: Fallback to mock data
3. **Tertiary**: Show loading/error states

### Phase 3: API Endpoint Mapping

#### 3.1 Public Endpoints
| Endpoint | Purpose | Frontend Usage |
|----------|---------|----------------|
| `GET /api/content/hero` | Hero section content | Homepage hero carousel |
| `GET /api/content/programs` | Program offerings | Programs page |
| `GET /api/content/events` | Event listings | Events section |
| `GET /api/content/team` | Team members | Team pages |
| `GET /api/content/mentor-talks` | Mentor sessions | Mentor Talks page |
| `GET /api/content/event-galleries` | Event media | Event galleries |
| `GET /api/content/testimonials` | Member testimonials | Testimonials section |

#### 3.2 Admin Endpoints
| Endpoint | Purpose | Access Level |
|----------|---------|--------------|
| `POST /api/admin/login` | Admin authentication | ADMIN |
| `GET /api/admin/content` | Manage all content | ADMIN |
| `POST /api/admin/media` | Upload media to Google Drive | ADMIN |
| `PUT /api/admin/content/:id` | Update content items | ADMIN |
| `DELETE /api/admin/content/:id` | Remove content items | ADMIN |

### Phase 4: Content Migration Process

#### 4.1 Initial Content Setup
1. **Export Current Mock Data**
   ```javascript
   // Export existing mock data structure
   import { programs, events, teamMembers } from '@/data/mockData';
   
   // Convert to CMS format
   const cmsFormattedData = {
     programs: programs.map(p => ({
       title: p.title,
       description: p.description,
       icon: p.icon,
       isActive: true,
       order: p.id
     })),
     // ... other content types
   };
   ```

2. **Bulk Import Script**
   ```bash
   # Run import script
   node scripts/import-mock-data.js
   ```

#### 4.2 Media Migration
1. **Upload Existing Images**
   - Move all images from current storage to Google Drive
   - Update database with new Google Drive URLs
   - Maintain filename consistency

2. **URL Mapping**
   ```javascript
   // Create URL mapping for smooth transition
   const urlMapping = {
     'old-image-url.jpg': 'https://drive.google.com/uc?id=NEW_FILE_ID',
     // ... map all existing URLs
   };
   ```

### Phase 5: Testing and Validation

#### 5.1 Connection Testing
```bash
# Test CMS connectivity
curl -X GET https://your-cms-domain.com/api/health

# Test specific endpoints
curl -X GET https://your-cms-domain.com/api/content/programs
```

#### 5.2 Fallback Testing
1. **Simulate CMS Downtime**
   ```bash
   # Temporarily disable CMS service
   # Verify frontend falls back to mock data
   ```

2. **Performance Testing**
   - Load testing with concurrent users
   - Response time validation
   - Fallback mechanism timing

#### 5.3 Content Validation
- Verify all content types display correctly
- Test media gallery functionality
- Validate responsive design across devices

### Phase 6: Production Deployment

#### 6.1 CMS Deployment
```bash
# Deploy CMS backend
git push heroku main

# Verify deployment
heroku logs --tail
```

#### 6.2 Frontend Update
1. **Update Environment Variables**
   ```env
   VITE_CMS_BASE_URL="https://production-cms-domain.com"
   VITE_USE_MOCK_DATA=false
   ```

2. **Deploy Frontend**
   ```bash
   # Build production version
   npm run build
   
   # Deploy to Netlify/Render
   netlify deploy --prod
   ```

## Monitoring and Maintenance

### Health Checks
```bash
# Automated health monitoring
*/5 * * * * curl -f https://your-cms-domain.com/api/health || alert_admin
```

### Backup Strategy
1. **Database Backups**
   ```bash
   # Daily PostgreSQL backups
   pg_dump yanc_cms > backup_$(date +%Y%m%d).sql
   ```

2. **Media Backups**
   - Google Drive version history
   - Regular sync to local storage

### Performance Optimization
- CDN for static assets
- Database query optimization
- API response caching
- Image compression and optimization

## Troubleshooting Guide

### Common Issues

#### CMS Connection Failures
```bash
# Check CMS service status
systemctl status yanc-cms

# Verify database connectivity
psql -h localhost -U username -d yanc_cms -c "SELECT 1;"

# Check firewall rules
ufw status
```

#### Media Loading Problems
1. **Google Drive Permissions**
   - Verify service account has proper access
   - Check file sharing settings
   - Validate folder permissions

2. **URL Format Issues**
   ```javascript
   // Ensure proper Google Drive URL format
   const correctFormat = "https://drive.google.com/uc?id=FILE_ID";
   ```

#### Fallback Mechanism Issues
```javascript
// Debug fallback behavior
console.log('CMS Response:', cmsResponse);
console.log('Using fallback:', useFallback);

// Force fallback for testing
localStorage.setItem('forceFallback', 'true');
```

## Security Considerations

### API Security
- JWT-based authentication for admin endpoints
- Rate limiting to prevent abuse
- Input validation and sanitization
- CORS configuration for frontend domains

### Data Protection
- Database encryption at rest
- SSL/TLS for all communications
- Regular security audits
- Backup encryption

### Access Control
- Single admin role implementation
- Secure password policies
- Session management
- Activity logging

## Future Enhancements

### Planned Features
1. **Advanced Analytics**
   - Content performance tracking
   - User engagement metrics
   - Popular content identification

2. **Enhanced Media Management**
   - Automatic image optimization
   - Video transcoding
   - Bulk media operations

3. **Content Scheduling**
   - Publish/unpublish scheduling
   - Automated content rotation
   - Time-based content display

This integration guide ensures a smooth transition from static mock data to dynamic CMS-powered content while maintaining reliability through comprehensive fallback mechanisms.