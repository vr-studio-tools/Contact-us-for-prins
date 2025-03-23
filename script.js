// Animate floating shapes with GSAP
const shapes = document.querySelectorAll('.shape');
shapes.forEach(shape => {
  gsap.to(shape, {
    x: () => gsap.utils.random(-50, 50),
    y: () => gsap.utils.random(-50, 50),
    rotation: () => gsap.utils.random(-30, 30),
    scale: () => gsap.utils.random(0.8, 1.2),
    duration: () => gsap.utils.random(2, 4),
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
});

// Share QR code functionality
const shareButton = document.getElementById('share-qr');
const downloadButton = document.getElementById('download-qr');
const qrImage = document.getElementById('qr-image');

shareButton.addEventListener('click', async () => {
  const qrUrl = qrImage.src;
  const shareData = {
    title: 'Contact Us QR Code',
    text: 'Scan this QR code to connect with us!',
    url: qrUrl
  };

  if (navigator.share && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      console.log('QR code shared successfully');
    } catch (err) {
      console.error('Error sharing QR code:', err);
    }
  } else {
    try {
      await navigator.clipboard.writeText(qrUrl);
      alert('QR code URL copied to clipboard: ' + qrUrl);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
      alert('Sharing not supported. QR code URL: ' + qrUrl);
    }
  }
});

// Download QR code functionality
downloadButton.addEventListener('click', () => {
  const qrUrl = qrImage.src;
  const link = document.createElement('a');
  link.href = qrUrl;
  link.download = 'contact-us-qr.png'; // Default filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});