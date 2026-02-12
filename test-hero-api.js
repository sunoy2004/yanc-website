const fetch = require('node-fetch');

async function testHeroAPI() {
  try {
    console.log('Testing GET /api/hero...');
    const response = await fetch('http://localhost:3001/api/hero');
    const data = await response.json();
    console.log('Current hero content:', JSON.stringify(data, null, 2));
    
    if (data && data.description) {
      console.log('\n✅ Description field is present in response');
      console.log('Description value:', data.description);
    } else {
      console.log('\n❌ Description field is missing or empty');
    }
    
  } catch (error) {
    console.error('Error testing API:', error.message);
  }
}

testHeroAPI();