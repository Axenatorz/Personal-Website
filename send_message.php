<?php
// WhatsApp number (format: country code + number, no + or spaces)
$wa_number = "6289535331960 0"; // 0895353319600 → 6289535331960 0
$wa_number = "62895353319600"; // Indonesia: 0895... → 62895...

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize inputs
    $first_name = htmlspecialchars(strip_tags(trim($_POST['first_name'] ?? '')));
    $last_name  = htmlspecialchars(strip_tags(trim($_POST['last_name']  ?? '')));
    $email      = filter_var(trim($_POST['email']   ?? ''), FILTER_SANITIZE_EMAIL);
    $subject    = htmlspecialchars(strip_tags(trim($_POST['subject']  ?? '')));
    $message    = htmlspecialchars(strip_tags(trim($_POST['message']  ?? '')));

    // Validate required fields
    if (empty($first_name) || empty($email) || empty($message)) {
        header('Location: index.html?status=error&msg=' . urlencode('Nama, email, dan pesan wajib diisi.'));
        exit;
    }

    // Build WhatsApp message
    $wa_text = "Halo! Ada pesan baru dari website kamu 👋\n\n";
    $wa_text .= "👤 *Nama*: {$first_name} {$last_name}\n";
    $wa_text .= "📧 *Email*: {$email}\n";
    if (!empty($subject)) {
        $wa_text .= "📌 *Subject*: {$subject}\n";
    }
    $wa_text .= "💬 *Pesan*:\n{$message}";

    // Encode for URL
    $encoded_text = urlencode($wa_text);

    // Redirect to WhatsApp
    $wa_url = "https://wa.me/{$wa_number}?text={$encoded_text}";
    header("Location: {$wa_url}");
    exit;
} else {
    // Not a POST request
    header('Location: index.html');
    exit;
}
