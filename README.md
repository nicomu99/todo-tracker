# Todo Tracker

A full-stack task manager where you can sign up, organise your work into task lists, and keep track of what is due and when.

## What it does

Todo Tracker lets each user manage their own tasks:

- **Accounts**: sign up, log in, update account details in the settings page, and log out.
- **Task lists**: create, rename, and delete lists to group related tasks. Deleting a list also removes its tasks.
- **Tasks**: add tasks to a list with a name, description, priority, effort estimate, and due date, then edit or delete them.
- **Dashboard**: an overview of your task lists and a calendar view of what is coming up.
- **Languages**: the interface is available in English and German, picked automatically from your browser settings.
- **Responsive layout**: works on desktop and mobile screens.

### How it is built

| Part | Stack |
| --- | --- |
| Backend | Python, FastAPI, Pydantic, PyJWT, pwdlib (Argon2), managed with uv |
| Frontend | Next.js (App Router), React, TypeScript, Tailwind CSS, date-fns |

The backend is a REST API organised in layers: routers handle HTTP, services hold the business logic, and repositories handle storage behind an abstract interface. The data is currently saved in memory, but the repository layer allows changing the saving mechanism without touching the remaining application.

The authentication uses short-lived JWT access tokens together with a long-lived refresh token stored in an HTTP-only cookie, which should minimize the risk of successfully logging in with stolen tokens. Passwords are only stored and processed in a hashed format. The login procedure performs a dummy hash for unknown usernames so response times don't reveal which accounts exist.

## What I learned

- Structuring a backend into routers, services, and repositories, and why an abstract repository makes swapping storage easy.
- Implementing token-based auth with access and refresh tokens, and storing the refresh token in an HTTP-only cookie.
- Building a localised Next.js app with the App Router and a locale-redirecting proxy.
