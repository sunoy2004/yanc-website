# STRICT EVENTS SECTION ISOLATION IMPLEMENTATION GUIDE

## Overview
This implementation enforces complete separation between:
- Upcoming Events
- Past Events  
- Event Gallery

Each section now uses completely independent data sources with no cross-contamination.

## 1. DATABASE CHANGES ✅

### Migration Script
Run `strict-events-isolation-migration.sql` in your Supabase SQL editor.

### Key Changes:
- Created new `event_gallery_items` table (standalone, no event references)
- Added `type` column to `event_content` table (upcoming/past)
- Updated existing events with appropriate types based on dates
- Created proper indexes and RLS policies

## 2. BACKEND API CHANGES ✅

### New Endpoints Created:
```
GET    /api/event-gallery-items/public  # Public gallery items
POST   /api/event-gallery-items         # Create gallery item
PUT    /api/event-gallery-items/:id     # Update gallery item
DELETE /api/event-gallery-items/:id     # Delete gallery item
PATCH  /api/event-gallery-items/:id/publish # Toggle publish status
```

### Updated Events Endpoints:
```
GET    /api/events/upcoming    # Only upcoming events (type = 'upcoming')
GET    /api/events/past        # Only past events (type = 'past')
GET    /api/events/gallery     # DEPRECATED - returns empty array
```

### Files Modified:
- `apps/cms-api/src/modules/event-gallery-items/` (new module)
- `apps/cms-api/src/modules/events/events.controller.ts` (updated filtering)
- `apps/cms-api/src/app.module.ts` (added new module)

## 3. FRONTEND CMS CHANGES ✅

### New Service Created:
`src/services/event-gallery-items.service.ts` - Handles isolated gallery operations

### Updated Service:
`src/services/events.service.ts` - Added type-specific methods:
- `getUpcomingEvents()` - Fetches only upcoming events
- `getPastEvents()` - Fetches only past events

## 4. WEBSITE FRONTEND CHANGES

### New Services to Create:
1. **eventsService.ts** - Strictly separated upcoming/past event fetching
2. **galleryService.ts** - Standalone gallery item fetching

### Implementation Plan:

#### Website Events Service (`src/services/cms/eventsService.ts`):
```typescript
export async function getUpcomingEvents() {
  const res = await fetch('/api/events/upcoming');
  const data = await res.json();
  console.log("UPCOMING DATA:", data);
  return data;
}

export async function getPastEvents() {
  const res = await fetch('/api/events/past');
  const data = await res.json();
  console.log("PAST DATA:", data);
  return data;
}
```

#### Website Gallery Service (`src/services/cms/galleryService.ts`):
```typescript
export async function getEventGallery() {
  const res = await fetch('/api/event-gallery-items/public');
  const data = await res.json();
  console.log("GALLERY DATA:", data);
  return data;
}
```

## 5. FRONTEND PAGE UPDATES NEEDED

### Events Pages:
- `src/pages/events/Upcoming.tsx` - Use `getUpcomingEvents()`
- `src/pages/events/Past.tsx` - Use `getPastEvents()`
- `src/pages/events/Gallery.tsx` - Use `getEventGallery()`

### CMS Pages:
- `yanc-cms/src/pages/Events.tsx` - Use type-specific endpoints
- `yanc-cms/src/pages/PastEvents.tsx` - Use type-specific endpoints
- `yanc-cms/src/pages/EventGallery.tsx` - Use new gallery service

## 6. STORAGE STRUCTURE

### Recommended Folder Structure:
```
media/
   events/
      upcoming/     # For upcoming event media
      past/         # For past event media
   gallery/         # For standalone gallery items
```

## 7. TESTING VERIFICATION

### Manual Test Flow:
1. Add upcoming event → should only appear in upcoming section
2. Add past event → should only appear in past section
3. Add gallery item → should only appear in gallery section
4. Delete gallery item → should NOT affect events
5. Unpublish upcoming → disappears only from upcoming section

### Console Verification:
Each page should log its specific data:
- Upcoming page: "UPCOMING DATA:"
- Past page: "PAST DATA:"  
- Gallery page: "GALLERY DATA:"

Datasets should be completely different with no overlap.

## 8. DEPLOYMENT STEPS

1. Run the migration SQL script
2. Deploy backend API changes
3. Update frontend services
4. Update frontend pages
5. Test all sections independently
6. Verify no data leakage between sections

## 9. BACKWARD COMPATIBILITY

- Old `/api/events/gallery` endpoint deprecated but returns empty array
- Existing event data preserved with new type classification
- Media associations maintained through new gallery items table

## 10. FINAL RESULT

✅ No cross-section contamination
✅ Gallery completely independent from events
✅ Upcoming & Past fully controlled by type
✅ Clean API separation
✅ Modular and scalable architecture