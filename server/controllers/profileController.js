const profileController = (req, res) => {
    res.status(200).json({
    id: req.user.id,
    email: req.user.email
    });
};

module.exports = {
    profileController
};