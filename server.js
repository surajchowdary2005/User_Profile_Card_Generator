
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const dataFile = path.join(__dirname, "profiles.json");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));

function escapeHTML(value) {
    return String(value || "").replace(/[&<>"']/g, function (char) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };
        return entities[char];
    });
}

app.post("/create-profile", (req, res) => {
    const name = (req.body.name || "").trim();
    const bio = (req.body.bio || "").trim();
    const skills = (req.body.skills || "")
        .split(",")
        .map(skill => skill.trim())
        .filter(Boolean);
    const social = (req.body.social || "").trim();

    if (!name || !bio || skills.length === 0) {
        return res.status(400).send("Please enter your name, bio, and at least one skill. Go back and try again.");
    }

    const profile = {
        id: "PROFILE-" + Date.now(),
        name,
        bio,
        skills,
        social
    };

    let profiles = [];

    try {
        if (fs.existsSync(dataFile)) {
            profiles = JSON.parse(fs.readFileSync(dataFile, "utf8") || "[]");
        }
    } catch (error) {
        return res.status(500).send("Could not read saved profiles. Please check profiles.json.");
    }

    profiles.push(profile);

    try {
        fs.writeFileSync(dataFile, JSON.stringify(profiles, null, 2));
    } catch (error) {
        return res.status(500).send("Could not save the profile.");
    }

    const safeName = escapeHTML(profile.name);
    const safeBio = escapeHTML(profile.bio);
    const safeSkills = profile.skills
        .map(skill => `<span class="skill">${escapeHTML(skill)}</span>`)
        .join(" ");
    const initial = escapeHTML(profile.name.charAt(0).toUpperCase());

    let socialLink = "";

    if (social) {
        try {
            const url = new URL(social);
            if (url.protocol === "https:" || url.protocol === "http:") {
                socialLink = `<p><a href="${escapeHTML(url.href)}" target="_blank" rel="noopener noreferrer">Visit Social Profile</a></p>`;
            }
        } catch (error) {
            socialLink = "";
        }
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your Profile Card</title>
            <link rel="stylesheet" href="/style.css">
        </head>
        <body>
            <header>
                <h1>Your Profile Card</h1>
            </header>

            <main>
                <section class="profile-card">
                    <div class="avatar">${initial}</div>
                    <h2>${safeName}</h2>
                    <p>${safeBio}</p>
                    <h3>Skills</h3>
                    <div class="skills">${safeSkills}</div>
                    ${socialLink}
                    <p><strong>Profile ID:</strong> ${escapeHTML(profile.id)}</p>
                    <p class="success-message">Profile created successfully!</p>
                    <a class="back-link" href="/">Create Another Profile</a>
                </section>
            </main>
        </body>
        </html>
    `);
});

app.get("/api/profiles", (req, res) => {
    try {
        const profiles = JSON.parse(fs.readFileSync(dataFile, "utf8") || "[]");
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ error: "Could not read profiles." });
    }
});

app.listen(PORT, () => {
    console.log(`Profile Card Generator running at http://localhost:${PORT}`);
});
