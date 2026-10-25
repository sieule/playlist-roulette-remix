# YouTube Playlist Roulette

A fun little web app inspired by Russian roulette: build a playlist of YouTube videos (one of them might be the "bad" one!), spin the cylinder, and watch your luck play out.

**Demo:** https://playlist-roulette-remix.lovable.app/

## Features

- **Playlist builder** — paste YouTube URLs directly or upload a `.txt` file containing one URL per line.
- **Spin & Play** — spin a six-shooter-style cylinder and the app plays one random video from your playlist.
- **Flexible playlist size** — play with 2 or more videos, no need for exactly 6.
- **Download playlist** — export your current playlist as a `.txt` file.
- **Multilingual UI** — switch between Vietnamese, English, and Japanese; your choice is remembered.
- **Dark neon design** — casino-style dark theme with neon accents.

## How to use

1. Add at least 2 YouTube URLs — paste them one by one, or upload a `.txt` file.
2. Press **Spin & Play** to spin the cylinder.
3. After the spin, a random video starts playing. No peeking!

## Technologies used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Run it locally

If you want to work locally using your own IDE, clone this repo and push changes — pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/sieule/playlist-roulette-remix

# Step 2: Navigate to the project directory.
cd playlist-roulette-remix

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of the repository.
- Click the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## License

This project is for personal and educational use.
