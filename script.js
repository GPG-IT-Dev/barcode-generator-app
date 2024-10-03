document.addEventListener('DOMContentLoaded', function() {
    // Import the JsBarcode library
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js';
    document.head.appendChild(script);

    script.onload = function() {
        // Add event listener to the generate button
        const generateBtn = document.getElementById('generate-btn');
        generateBtn.addEventListener('click', function() {
            const textInput = document.getElementById('text-input').value;
            if (textInput.trim() === "") {
                alert("Please enter text to generate a barcode.");
                return;
            }
            const canvas = document.getElementById('barcode');
            JsBarcode(canvas, textInput, {
                format: 'CODE128',
                displayValue: true
            });
        });

        // Add event listener to the copy button
        const copyBtn = document.getElementById('copy-btn');
        copyBtn.addEventListener('click', function() {
            const canvas = document.getElementById('barcode');
            canvas.toBlob(function(blob) {
                const item = new ClipboardItem({ 'image/png': blob });
                navigator.clipboard.write([item]).then(function() {
                    alert("Barcode copied to clipboard successfully!");
                });
            });
        });
    };
});
