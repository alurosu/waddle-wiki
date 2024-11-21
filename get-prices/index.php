<?php
// Path to cache file
$cacheFile = 'btc.json';
$cacheTime = 300; // Cache for 5 minutes (300 seconds)

// Check if cache exists and is still valid
if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < $cacheTime) {
    // Return cached data
    header('Content-Type: application/json');
    echo file_get_contents($cacheFile);
    exit;
}

// Make API request
$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cwaddle-waddle-pengu&vs_currencies=usd%2Csats",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        "accept: application/json",
        "x-cg-demo-api-key: ---"
    ]
]);

$response = curl_exec($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

// Check for errors
if ($httpCode === 200) {
    // Save response to cache
    file_put_contents($cacheFile, $response);

    // Return the response
    header('Content-Type: application/json');
    echo $response;
} else {
    // Return an error response
    http_response_code($httpCode);
    header('Content-Type: application/json');
    echo json_encode(["error" => "Failed to fetch data from API."]);
}
?>
