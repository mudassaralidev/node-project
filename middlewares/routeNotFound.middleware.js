const routeNotFound = (req, res, next) => {
    return res.status(404).send("Route does not found");
};

export default routeNotFound;