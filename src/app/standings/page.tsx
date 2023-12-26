'use client';

export default function Standings() {
    return (
        <>
            <h1>Standings</h1>
            <div id="wg-api-football-standings"
                data-host="api-football-v1.p.rapidapi.com"
                data-key={process.env.NEXT_PUBLIC_API_KEY}
                data-league="39"
                data-team=""
                data-season="2023"
                data-theme=""
                data-show-errors="false"
                data-show-logos="true"
                className="wg_loader">
            </div>
            <script src="https://widgets.api-sports.io/2.0.3/widgets.js" type="module" ></script>
        </>

    );
}