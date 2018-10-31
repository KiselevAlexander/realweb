<?php
/**
 * User: alexander
 * Date: 31.10.18
 * Time: 8:29
 */

$data = $_REQUEST;

$FORMS = [
    'history' => 'Предложение истории',
    'lot' => 'Предложение лота',
    'feedback' => 'Обратная всязь'
];

$FIELDS = [
    'name' => 'ФИО',
    'email' => 'Email',
    'phone' => 'Телефон',
    'company' => 'Компания',
    'lot' => 'Название лота',
    'lotInfo' => 'Краткая история о лоте',
    'message' => 'Сообщение'
];

$to = 'lv@realweb.ru, keesik@yandex.ru';

$subject = (array_key_exists('type', $data) && array_key_exists($data['type'], $FORMS))
    ? $FORMS[$data['type']]
    : 'Заполнена форма на сайте';

$headers = [
    "From: no-reply@realweb20.ru",
    "Reply-To: ". strip_tags($data['email']),
    "Organization: Realweb",
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=UTF-8",
    "X-Priority: 3",
    'X-Mailer: PHP/' . phpversion()
];

$message = '<html><body>';
$message .= "<h1>{$subject}</h1>";
$message .= "<hr />";
$message .= "<table><tbody></tbody>";

foreach ($data as $key => $value) {
    if (array_key_exists($key, $FIELDS)) {
        $message .= "<tr><td><b>{$FIELDS[$key]}:</b></td><td>{$value}</td></tr>";
    }
}

$message .= "</tbody></table>";

$message .= '</body></html>';

$res = mail($to, $subject, $message, join("\r\n", $headers));

header('content-type: application/json');
if ($res) {
    echo json_encode([
        'success' => true
    ]);
} else {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        "error" => "Message not sent"
    ]);
}
