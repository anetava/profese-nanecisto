# Nanečisto Studio

`/studio/` is an interactive presentation of KPV and UPV paths, student accounts and an academic overview. With `firebaseConfig = null`, it uses four **fictional** accounts. Demo decisions reset on reload. No data is sent to a server.

## Activate central accounts

1. Create a **separate** Firebase project for Nanečisto (never reuse Lesnická akademie). Enable Authentication providers **Anonymous** (students) and **Google** (academic team); add the deployed domain to authorized domains. Create a Firestore database in an EU location. Check institution and privacy requirements before collecting real student data.
2. Copy the Firebase web application configuration object into `studio/firebase-config.js`, replacing `null`. The web configuration is public; **never** place service account keys or a Google password in this repository.
3. Publish `studio/firestore.rules` as the Firestore rules for that project. Review the rule set and test it against an emulator before using actual students.
4. Each of the three academics signs in with Google once to discover their Firebase Authentication UID. A project administrator creates `admins/{uid}` in Firestore Console for Akademik ČR 1, Akademik ČR 2 and Akademik SR. Client code cannot grant its own admin role. The academic team can then see every student profile and recorded case choice.
5. Verify two different student browser sessions and the academic dashboard. Only then announce a real pilot. The current GitHub Pages public site remains a presentation until these steps are done.

Student sessions use Firebase Anonymous Authentication. Their UID is stable in that browser's signed-in session but can be lost when the browser storage is cleared; it is not a verified student identity. The app stores track, CZ/SR group, a generated label and choices. It does not store names or actual stories from practice. The academic dashboard currently fetches each student choice collection; replace this with pagination/aggregate processing before a large deployment. No validated professional assessment is claimed.

The lesson content and illustrations come from this repository. Older `/praxe.html` uses local browser storage and is **not** imported automatically to Firebase. Lesnická akademie lives in a different repository and is untouched.
