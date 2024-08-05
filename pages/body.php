<body>
    <div class="noselect" id="crosshair">-•-</div>

    <div id="landing-page">
        <div class="game-logo">
            <div class="game-name-decoration">⌞↽⫎⫐⨵⪓</div>
            <div class="game-name">GSAWER</div>
            <div class="game-name-decoration">⪔⨴⫏⫍⇁⌟</div>
        </div>
        <button class="classic-look game-button" id="start-game-button">Play</button>
    </div>

    <div class="classic-look" id="game-over-overlay">
        <div id="game-over-text">GAME OVER</div>
        <button class="classic-look game-button" id="home-button">Home</button>
    </div>

    <div class="classic-look" id="pause-overlay">
        <div id="pause-header">Gsawer is paused</div>
        <div id="pause-stats">
            <div>0:12:34 played</div>
            <div>12 enemy(ies) killed</div>
            <div>1.4km travelled</div>
            <div>199mg of caffeine in bloodstream</div>
        </div>
        <div class="press-key-info">press >Esc to continue</div>
    </div>

    <canvas id="game-canvas"></canvas>

    <div id="fire-rate-timer"></div>

    <div class="classic-look" id="inventory">
        <div id="inventory-header">Inventory</div>
        <div id=inventory-body></div>
        <div class="press-key-info" id="inventory-footer">Press >e to close</div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script type="module" src="src/scripts/game.js"></script>
</body>