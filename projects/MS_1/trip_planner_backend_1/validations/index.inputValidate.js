// input validation in custome function
function validateFlightQueryParams(query) {
  const errors = [];
  if (!query.origin) errors.push("Origin is required.");
  if (!query.destination) errors.push("Destination is required.");
  return errors;
}

function validateHotelsQueryParams(query) {
  let errors = [];
  if (!query.location) errors.push("Location is required");
  return errors;
}

function validateSitesQueryParams(query) {
  let errors = [];
  if (!query.location) errors.push("Location is required");
  return errors;
}

module.exports = {
  validateFlightQueryParams,
  validateHotelsQueryParams,
  validateSitesQueryParams,
};
