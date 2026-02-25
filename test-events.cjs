const fetch = require('node-fetch');

async function testEvents() {
  try {
    console.log('Testing upcoming events endpoint...');
    const response = await fetch('http://localhost:3001/api/events/upcoming');
    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Data:', JSON.stringify(data, null, 2));
    
    console.log('\nTesting past events endpoint...');
    const pastResponse = await fetch('http://localhost:3001/api/events/past');
    const pastData = await pastResponse.json();
    console.log('Past Response status:', pastResponse.status);
    console.log('Past Data:', JSON.stringify(pastData, null, 2));
    
    console.log('\nTesting gallery endpoint...');
    const galleryResponse = await fetch('http://localhost:3001/api/event-gallery-items/public');
    const galleryData = await galleryResponse.json();
    console.log('Gallery Response status:', galleryResponse.status);
    console.log('Gallery Data:', JSON.stringify(galleryData, null, 2));
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testEvents();