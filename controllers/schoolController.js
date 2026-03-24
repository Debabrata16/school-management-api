const db = require("../config/db");

const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (
      !name ||
      !address ||
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    if (typeof name !== "string" || typeof address !== "string") {
      return res.status(400).json({
        success: false,
        message: "Name and address must be strings"
      });
    }

    const trimmedName = name.trim();
    const trimmedAddress = address.trim();

    if (!trimmedName || !trimmedAddress) {
      return res.status(400).json({
        success: false,
        message: "Name and address cannot be empty"
      });
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude must be valid numbers"
      });
    }

    if (lat < -90 || lat > 90) {
      return res.status(400).json({
        success: false,
        message: "Latitude must be between -90 and 90"
      });
    }

    if (lon < -180 || lon > 180) {
      return res.status(400).json({
        success: false,
        message: "Longitude must be between -180 and 180"
      });
    }

    const query =
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";

    const [result] = await db.execute(query, [
      trimmedName,
      trimmedAddress,
      lat,
      lon
    ]);

    return res.status(201).json({
      success: true,
      message: "School added successfully",
      schoolId: result.insertId
    });
  } catch (error) {
    console.error("Add school error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degree) => (degree * Math.PI) / 180;

  const earthRadiusKm = 6371;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
};

const listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        success: false,
        message: "User latitude and longitude are required"
      });
    }

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    if (Number.isNaN(userLat) || Number.isNaN(userLon)) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude must be valid numbers"
      });
    }

    if (userLat < -90 || userLat > 90) {
      return res.status(400).json({
        success: false,
        message: "Latitude must be between -90 and 90"
      });
    }

    if (userLon < -180 || userLon > 180) {
      return res.status(400).json({
        success: false,
        message: "Longitude must be between -180 and 180"
      });
    }

    const [schools] = await db.execute("SELECT * FROM schools");

    const sortedSchools = schools
      .map((school) => {
        const distance = calculateDistance(
          userLat,
          userLon,
          school.latitude,
          school.longitude
        );

        return {
          ...school,
          distance: Number(distance.toFixed(2))
        };
      })
      .sort((a, b) => a.distance - b.distance);

    return res.status(200).json({
      success: true,
      count: sortedSchools.length,
      data: sortedSchools
    });
  } catch (error) {
    console.error("List schools error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

module.exports = {
  addSchool,
  listSchools
};