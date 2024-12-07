const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
app.use(cors());

app.get('/subdomains', (req, res) => {
    const domain = req.query.domain;

    if (!domain) {
        return res.status(400).json({ error: 'Domain is required!' });
    }

    // Use a subdomain scanning tool (replace with an actual command/tool)
    exec(`subfinder -d ${domain} -silent`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: 'Error scanning subdomains!' });
        }
        const subdomains = stdout.split('\n').filter(Boolean);
        res.json({ subdomains });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
