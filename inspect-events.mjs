import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const https = require('https');

function getData(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          console.log('=== RAW API RESPONSE ===');
          console.log(JSON.stringify(jsonData, null, 2));
          console.log('\n=== TRANSFORMED DATA ===');
          
          const transformed = jsonData.map(event => ({
            id: event.id,
            title: event.title,
            description: event.description,
            date: event.event_date || event.date || '',
            location: event.location,
            image: event.imageUrl || event.image_url || '/placeholder.jpg',
            type: 'upcoming',
            isActive: event.is_active !== undefined ? event.is_active : (event.isActive !== undefined ? event.isActive : true),
            mediaItems: event.mediaItems || []
          }));
          
          console.log(JSON.stringify(transformed, null, 2));
          console.log('\n=== FILTERING TEST ===');
          const filtered = transformed.filter(event => event.isActive !== false);
          console.log(`Original count: ${transformed.length}`);
          console.log(`Filtered count: ${filtered.length}`);
          console.log('Filtered events:');
          console.log(JSON.stringify(filtered, null, 2));
          
          resolve(transformed);
        } catch (err) {
          reject(err);
        }
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
  });
}

getData('http://localhost:8082/api/events/upcoming').catch(console.error);