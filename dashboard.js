// Function to generate weather dashboard UI
function generateWeatherDashboard(data, targetElementId) {
    const outputElement = document.getElementById(targetElementId);
    
    // Format sunrise and sunset times
    const formatTime = (timestamp) => {
      const date = new Date(timestamp * 1000);
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    };
    
    // Create HTML content
    const html = `
      <div class="card weather-card bg-white p-4 mb-4">
        <div class="row">
          <!-- Location and Basic Info -->
          <div class="col-md-6">
            <div class="d-flex align-items-center mb-3">
              <i class="fas fa-map-marker-alt text-danger me-2"></i>
              <h2 class="mb-0">${data.name}, ${data.sys.country}</h2>
            </div>
            <div class="weather-detail">
              <span class="info-icon"><i class="fas fa-calendar-day text-primary"></i></span>
              <span id="date">${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div class="weather-detail">
              <span class="info-icon"><i class="fas fa-clock text-primary"></i></span>
              <span>Timezone: UTC${data.timezone > 0 ? '+' : ''}${data.timezone / 3600}</span>
            </div>
            <div class="weather-detail">
              <span class="info-icon"><i class="fas fa-sun text-warning"></i></span>
              <span>Sunrise: ${formatTime(data.sys.sunrise)}</span>
            </div>
            <div class="weather-detail">
              <span class="info-icon"><i class="fas fa-moon text-dark"></i></span>
              <span>Sunset: ${formatTime(data.sys.sunset)}</span>
            </div>
          </div>
          
          <!-- Temperature Display -->
          <div class="col-md-6 text-center">
            <div class="weather-icon text-primary mb-2">
              <i class="${getWeatherIcon(data.weather[0].main)}"></i>
            </div>
            <div class="temp-display text-primary">${Math.round(data.main.temp)}°F</div>
            <div class="mb-2">Feels like: ${data.main.feels_like.toFixed(1)}°F</div>
            <div class="badge bg-info fs-6 mb-2">${data.weather[0].description}</div>
          </div>
        </div>
      </div>
      
      <!-- Location Information -->
      <div class="row justify-content-center">
        <div class="col-md-8 mb-3">
          <div class="card weather-card h-100">
            <div class="card-body">
              <h5 class="card-title text-danger">
                <i class="fas fa-map-pin me-2"></i> Location
              </h5>
              <div class="weather-detail">
                <span class="info-icon"><i class="fas fa-map-marked-alt"></i></span>
                <span>Coordinates:</span>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="weather-detail">
                    <span class="info-icon"><i class="fas fa-location-arrow"></i></span>
                    <span>Lat: ${data.coord.lat}°</span>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="weather-detail">
                    <span class="info-icon"><i class="fas fa-location-arrow"></i></span>
                    <span>Lon: ${data.coord.lon}°</span>
                  </div>
                </div>
              </div>
              <div class="weather-detail mt-2">
                <span class="info-icon"><i class="fas fa-eye"></i></span>
                <span>Visibility: ${data.visibility} m</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Footer with API Info -->
      <div class="text-center text-muted mt-3">
        <small>Data from Weather API • Response Code: ${data.cod} • Station: ${data.base}</small>
      </div>
    `;
    
    // Set the HTML content of the target element
    outputElement.innerHTML = html;
  }
  
  // Helper function to get appropriate weather icon class based on weather condition
  function getWeatherIcon(weatherMain) {
    const iconMap = {
      'Clear': 'fas fa-sun',
      'Clouds': 'fas fa-cloud',
      'Rain': 'fas fa-cloud-rain',
      'Drizzle': 'fas fa-cloud-rain',
      'Thunderstorm': 'fas fa-bolt',
      'Snow': 'fas fa-snowflake',
      'Mist': 'fas fa-smog',
      'Smoke': 'fas fa-smog',
      'Haze': 'fas fa-smog',
      'Dust': 'fas fa-smog',
      'Fog': 'fas fa-smog',
      'Sand': 'fas fa-wind',
      'Ash': 'fas fa-smog',
      'Squall': 'fas fa-wind',
      'Tornado': 'fas fa-wind'
    };
    
    return iconMap[weatherMain] || 'fas fa-cloud-sun'; // Default icon
  }
  
  // Add necessary styles for the dashboard
  function addWeatherStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .weather-card {
        border-radius: 15px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        transition: transform 0.3s;
      }
      .weather-card:hover {
        transform: translateY(-5px);
      }
      .weather-icon {
        font-size: 3rem;
      }
      .temp-display {
        font-size: 3.5rem;
        font-weight: normal;
      }
      .info-icon {
        width: 25px;
        text-align: center;
        margin-right: 10px;
      }
      .weather-detail {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
      }
    `;
    document.head.appendChild(styleElement);
  }