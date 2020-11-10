<?php
defined('ALTUMCODE') || die();
User::check_permission(1);

$instagram_user_id 	= (isset($parameters[2])) ? (int) $parameters[2] : false;
$url_token 	        = (isset($parameters[3])) ? $parameters[3] : false;

if($type && $type == 'delete') {
    /* Check for errors and permissions */
    if(!Security::csrf_check_session_token('url_token', $url_token)) {
        $_SESSION['error'][] = $language->global->error_message->invalid_token;
    }


    if(empty($_SESSION['error'])) {
        $database->query("DELETE FROM `instagram_users` WHERE `id` = {$instagram_user_id}");
        $database->query("DELETE FROM `instagram_logs` WHERE `instagram_user_id` = {$instagram_user_id}");
        $database->query("DELETE FROM `favorites` WHERE `source_user_id` = {$instagram_user_id} AND `source` = 'INSTAGRAM'");
        $database->query("DELETE FROM `unlocked_reports` WHERE source_user_id = {$instagram_user_id} AND `source` = 'INSTAGRAM'");

        $_SESSION['success'][] = $language->global->success_message->basic;
    }

    redirect('admin/source-users-management/' . $source);
}

