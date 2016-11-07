<?php
header('content-type:text/html;charset="utf-8"');
error_reporting(0);
$cpage = isset($_GET['cpage']) ? $_GET['cpage'] : 1;
$url = 'http://www.wookmark.com/api/json/popular?page='. $cpage;
$content = file_get_contents($url);
$content = iconv('gbk', 'utf-8', $content);
echo $content;
?>