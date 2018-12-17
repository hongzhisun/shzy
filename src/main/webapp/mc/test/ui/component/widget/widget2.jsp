<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<title>表格</title>
		<%@ include file="/mc/common/mc_all.jspf" %>

		<script type="text/javascript" src="mc/test/ui/component/widget/widget2.js"></script>

		<style>
		a {
			color: blue;
			text-decoration: underline;
		}
		
		a:hover {
			color: #CC3300;
			text-decoration: underline;
		}
		</style>
	</head>

	<body>
		<input id="input1" type="text">
		<br />
		<input id="input2" type="text">
		<br />

		<button id="btnTest1">test1</button>
		<button id="btnTest2">test2</button>
	</body>
</html>