//part 1 folllow this : https://secure.na1.echosign.com/public/static/oauthDoc.jsp


var redirect_uri = "https://emarkovic.github.io/adobe-auth/";
var response_type = "code";
var scope = "user_login:self+agreement_write:account+agreement_send:account:widget_write:account";

var grant_type = "authorization_code"

var submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", () => {
	var clientIdField = document.getElementById("clientId");
	var clientSecretField = document.getElementById("clientSecret");

	var client_id = clientIdField.value;
	var client_secret = clientSecretField.value;

	if (paramExists(client_id) && paramExists(client_secret)) {
		localStorage.setItem("client_id", client_id);
		localStorage.setItem("client_secret", client_secret);

		clientIdField.value = "";
		clientSecretField.value = "";

		getAuthorizationCode();
	}
});

window.onload = () => {
	var currentUrl = new URL(window.location.href);
	var authorization_code = currentUrl.searchParams.get("code");
	if (paramExists(authorization_code)) {
		localStorage.setItem("authorization_code", authorization_code);
		getAccessToken();
	}
}


function getAuthorizationCode() {
	var url = "https://secure.na1.echosign.com/public/oauth";
	var client_id = localStorage.getItem("client_id");
	
	if (paramExists(client_id)) {
		var urlParams = "?redirect_uri=" + redirect_uri + 
				"&response_type=" + response_type + 
				"&client_id=" + client_id +
				"&scope=" + scope;

		document.getElementById("signIn").href = url + urlParams;
	}
}



function getAccessToken() {
	var url = "https://api.na2.echosign.com/oauth/token";

	var client_id = localStorage.getItem("client_id");
	var client_secret = localStorage.getItem("client_secret");
	var authorization_code = localStorage.getItem("authorization_code");

	if (paramExists(client_id) && paramExists(client_secret) && paramExists(authorization_code)) {
		var urlParams = "?grant_type=" + grant_type +
						"&client_id=" + client_id + 
						"&client_secret=" + client_secret + 
						"&redirect_uri=" + redirect_uri + 
						"&code=" + authorization_code;

		fetch(url + urlParams, {method: "POST", mode: "no-cors", headers: {"Content-Type": "application/x-www-form-urlencoded"}})
			.then(res => res.json())
			.then(console.log)

	}
}

function paramExists(param) {
	return param && param.trim().length;
}

