const maliciousPatterns = [
    /SELECT.*FROM/i,
    /<script.*?>/i,
    /(?:%27)|(?:')|(?:--)/i,
    /union.*select/i,
    /<iframe.*?>/i,
];

function isMalicious(input) {
    return maliciousPatterns.some(pattern => pattern.test(input));
}

module.exports = function intrusionDetection(req, res, next) {
    const requestBody = JSON.stringify(req.body);
    const requestParams = JSON.stringify(req.params);
    const requestQuery = JSON.stringify(req.query);

    if (isMalicious(requestBody) || isMalicious(requestParams) || isMalicious(requestQuery)) {
        console.warn('Malicious activity detected:', req.ip);
        return res.status(403).send('Access denied');
    }

    next();
};
