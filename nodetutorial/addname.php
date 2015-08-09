<?php
include 'connect.php';

if(isset($_GET['name'])){ $name = $_GET['name'];}

$SQL = "INSERT into names( perosn ) VALUES ('$name')";
		mysql_query($SQL) or die("could not get name");
		echo $name . " added successfully";
?>