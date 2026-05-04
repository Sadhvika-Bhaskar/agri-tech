# 🌍 SoilGrids.org Integration Guide

## Overview

AgriTwin now integrates with **SoilGrids.org** (ISRIC - World Soil Information) to automatically fetch soil property data based on GPS coordinates. This eliminates the need for manual soil data entry and provides globally consistent soil information.

## What is SoilGrids?

SoilGrids is a system for global digital soil mapping that uses state-of-the-art machine learning methods to map the spatial distribution of soil properties across the globe.

- **Coverage**: Global (worldwide)
- **Resolution**: 250 meters
- **Depth Layers**: Multiple depths from 0cm to 200cm
- **Properties**: pH, Organic Carbon, Nitrogen, CEC, Bulk Density, and more
- **Provider**: ISRIC - World Soil Information
- **API**: REST API (free to use)

## How to Use

### Step 1: Navigate to Dashboard
- Click on **"Dashboard"** in the navigation menu

### Step 2: Enter Location Details
1. **District/Location**: Enter your field location name (e.g., "Krishna, Andhra Pradesh")
2. **GPS Coordinates**: Enter coordinates in one of these formats:
   - **Comma-separated**: `16.5062, 80.6480` (recommended)
   - **Space-separated**: `16.5062 80.6480`
   - Format: Latitude first, then Longitude
   - Latitude range: -90 to 90
   - Longitude range: -180 to 180

### Step 3: Fetch Soil Data
- Click the **"Fetch Soil Data from SoilGrids.org"** button
- Wait 2-5 seconds for the API to respond
- Soil data will be automatically populated in the fields below

### Step 4: Review Fetched Data
The following soil properties will be displayed:
- **Nitrogen (N)**: Total nitrogen in g/kg
- **Phosphorus (P)**: Estimated based on CEC and organic matter (in ppm)
- **Potassium (K)**: Estimated based on CEC (in ppm)
- **pH (H2O)**: Soil pH measured in water
- **Organic Carbon**: Soil organic carbon content in g/kg

## Sample Coordinates to Try

### India
- **Mumbai**: `19.0760, 72.8777`
- **Delhi**: `28.7041, 77.1025`
- **Bangalore**: `12.9716, 77.5946`
- **Hyderabad**: `17.3850, 78.4867`
- **Chennai**: `13.0827, 80.2707`
- **Krishna District, AP**: `16.5062, 80.6480`

### Other Countries
- **Iowa, USA**: `42.0308, -93.6319`
- **Netherlands**: `52.1326, 5.2913`
- **Brazil (São Paulo)**: `-23.5505, -46.6333`

## Understanding the Data

### Nitrogen (N)
- Measured in **g/kg** (grams per kilogram)
- Typical range: 0.5 - 5.0 g/kg
- Higher values indicate more fertile soil
- Important for leaf and stem growth

### Phosphorus (P)
- Measured in **ppm** (parts per million)
- Typical range: 5 - 50 ppm
- Important for root development and flowering
- Note: Estimated based on other soil properties

### Potassium (K)
- Measured in **ppm** (parts per million)
- Typical range: 50 - 300 ppm
- Important for overall plant health and disease resistance
- Note: Estimated based on CEC values

### pH (H2O)
- Scale: 0 - 14
- Optimal for most crops: 6.0 - 7.5
- Below 6.0: Acidic soil
- Above 7.5: Alkaline soil

### Organic Carbon
- Measured in **g/kg**
- Typical range: 5 - 50 g/kg
- Higher values indicate better soil health
- Important for water retention and nutrient availability

## Technical Details

### API Endpoint
```
https://rest.isric.org/soilgrids/v2.0/properties/query
```

### Parameters Used
- **lon**: Longitude coordinate
- **lat**: Latitude coordinate
- **property**: nitrogen, phh2o, soc, cec
- **depth**: 0-5cm (topsoil layer)
- **value**: mean (average value)

### Data Processing
1. Nitrogen: Converted from cg/kg to g/kg (÷100)
2. pH: Converted from pH×10 to pH (÷10)
3. Organic Carbon: Converted from dg/kg to g/kg (÷10)
4. Phosphorus: Estimated using formula based on SOC and CEC
5. Potassium: Estimated using formula based on CEC

## Troubleshooting

### Error: "Please enter GPS coordinates"
- Make sure the coordinates field is filled
- Use the format: Latitude, Longitude
- Example: `16.5062, 80.6480`

### Error: "Invalid coordinate format"
- Check that you have both latitude and longitude separated by comma or space
- Coordinates should be in decimal format (not degrees/minutes/seconds)
- Example valid formats:
  - `16.5062, 80.6480` ✅
  - `16.5062 80.6480` ✅
  - `16.5062,80.6480` ✅

### Error: "Latitude must be between -90 and 90"
- Check your latitude value
- Northern hemisphere: positive values (0 to 90)
- Southern hemisphere: negative values (0 to -90)

### Error: "Longitude must be between -180 and 180"
- Check your longitude value
- Eastern hemisphere: positive values (0 to 180)
- Western hemisphere: negative values (0 to -180)

### Error: "HTTP error! status: 404" or "Invalid response"
- The coordinates might be in the ocean or Antarctica
- Try coordinates on land
- Check for typos in coordinates

### API Not Responding
- SoilGrids API might be temporarily down
- Check your internet connection
- Try again after a few minutes

## Finding Coordinates

### Method 1: Google Maps
1. Open Google Maps
2. Right-click on your farm location
3. Click on the coordinates to copy them
4. Paste directly into the coordinates field
5. Format will be: `Latitude, Longitude`

### Method 2: GPS Device
- Use a GPS-enabled smartphone or device
- Many farming apps show GPS coordinates
- Copy in the format: `Latitude, Longitude`

### Method 3: Online Tools
- Use websites like https://www.latlong.net/
- Enter your address to get coordinates
- Copy the coordinates as shown

## Limitations

1. **Resolution**: 250m - may not capture very small field variations
2. **Predictions**: Data is based on ML models, not direct measurements
3. **Phosphorus & Potassium**: Estimated values (SoilGrids doesn't provide these directly)
4. **Updates**: Data is periodically updated but not real-time
5. **Depth**: Currently using 0-5cm layer (topsoil only)

## Best Practices

1. ✅ Use the most accurate coordinates possible
2. ✅ Verify fetched data with on-ground soil tests when critical
3. ✅ Use data as a starting point for farm planning
4. ✅ Consider local soil variations within large fields
5. ✅ Combine with other data sources for comprehensive analysis

## References

- **SoilGrids Website**: https://soilgrids.org/
- **API Documentation**: https://rest.isric.org/soilgrids/v2.0/docs
- **ISRIC**: https://www.isric.org/
- **Scientific Paper**: [SoilGrids 2.0: producing soil information for the globe with quantified spatial uncertainty](https://soil.copernicus.org/articles/7/217/2021/)

## Support

For issues or questions about SoilGrids data:
- Visit: https://www.isric.org/explore/soilgrids/faq-soilgrids
- Email: soil.grids@isric.org

For AgriTwin platform issues:
- Contact: contact@agritwin.com

---

**Last Updated**: February 25, 2026
**Version**: 1.0
