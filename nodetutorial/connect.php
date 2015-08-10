<?php
//echo "Hello World!";
$db = mysqli_connect('localhost', 'root', '', 'nodetut');
// deprecated
/*//$db = mysql_connect("localhost","root","") or die("Could not connect."); 
if($db)
		die("no db");
//if(!mysql_select_db("nodetut",$db))
if(!mysql_select_db($db, "nodetut"))
	die("No database selected.");*/
// Check connection
	if (mysqli_connect_errno()){
	  die("no db");
	//echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
?>
	