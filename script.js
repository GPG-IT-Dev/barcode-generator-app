document.addEventListener('DOMContentLoaded', function() {
    // Import the JsBarcode library
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js';
    document.head.appendChild(script);

    let easterEggEnabled = false;
    let intervalId = null;  // To track the interval for color change

    script.onload = function() {
        // Add event listener to the generate button
        const generateBtn = document.getElementById('generate-btn');
        generateBtn.addEventListener('click', function() {
            const textInput = document.getElementById('text-input').value;
            if (textInput.trim() === "") {
                alert("Veuillez entrer du texte pour générer un code-barres.");
                return;
            }
            const canvas = document.getElementById('barcode');
            JsBarcode(canvas, textInput, {
                format: 'CODE128',
                displayValue: true
            });

            // Copy the barcode to the clipboard
            canvas.toBlob(function(blob) {
                const item = new ClipboardItem({ 'image/png': blob });
                navigator.clipboard.write([item]);
            });
        });

        // Add event listener for the keyboard shortcut Ctrl+Shift+Q to trigger the easter egg
        document.addEventListener('keydown', function(event) {
            if (event.ctrlKey && event.shiftKey && event.key === 'Q') {
                toggleEasterEgg();
            }
        });

        function triggerEasterEgg() {
            // Implement "boite de nuit" mode
            document.body.style.backgroundColor = 'black';
            document.body.style.color = 'white';
            document.body.style.transition = 'background-color 0.5s ease';

            // Add some animations
            const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
            let colorIndex = 0;
            intervalId = setInterval(function() {
                document.body.style.backgroundColor = colors[colorIndex];
                colorIndex = (colorIndex + 1) % colors.length;
            }, 500);

            // Implement "licorne" mode
            const unicornImage = document.createElement('img');
            unicornImage.id = 'unicorn-image';  // Give it an ID to find it easily later
            unicornImage.src = 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGUzZjNhcDV1OG4zaDIxMTltdTg0djFuemcwdXlnOG14bnduaTc2ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LW3F52LZisNQ7UFJbV/giphy.webp';
            unicornImage.style.position = 'fixed';
            unicornImage.style.bottom = '0';
            unicornImage.style.right = '0';
            unicornImage.style.width = '200px';
            unicornImage.style.height = '200px';
            unicornImage.style.animation = 'bounce 2s infinite';
            document.body.appendChild(unicornImage);

            // Add keyframes for bounce animation
            const styleSheet = document.styleSheets[0];
            styleSheet.insertRule(`
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% {
                        transform: translateY(0);
                    }
                    40% {
                        transform: translateY(-30px);
                    }
                    60% {
                        transform: translateY(-15px);
                    }
                }
            `, styleSheet.cssRules.length);
        }

        function disableEasterEgg() {
            // Revert "boite de nuit" mode
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
            document.body.style.transition = '';

            // Remove unicorn image
            const unicornImage = document.getElementById('unicorn-image');
            if (unicornImage) {
                unicornImage.remove();
            }

            // Remove the color change interval
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }

            // Remove bounce animation keyframes
            const styleSheet = document.styleSheets[0];
            for (let i = 0; i < styleSheet.cssRules.length; i++) {
                if (styleSheet.cssRules[i].name === 'bounce') {
                    styleSheet.deleteRule(i);
                    break;
                }
            }
        }

        function toggleEasterEgg() {
            easterEggEnabled = !easterEggEnabled;
            if (easterEggEnabled) {
                triggerEasterEgg();
            } else {
                disableEasterEgg();
            }
        }
    };
});
