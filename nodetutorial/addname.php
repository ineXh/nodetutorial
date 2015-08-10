<?php
include 'connect.php';

if(isset($_GET['name'])){ $name = $_GET['name'];}
//echo "addname";
//echo $name;
$SQL = "INSERT into names( person ) VALUES ('$name')";
		//mysql_query($SQL) or die("could not get name"); // deprecated
		mysqli_query($db,$SQL) or die("could not get name");
		echo $name . " added successfully";
?>