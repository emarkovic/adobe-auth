//part 1 folllow this : https://secure.na1.echosign.com/public/static/oauthDoc.jsp


var redirect_uri = "https://example.com/oauthDemo";
var response_type = "code";
var scope = "agreement_read:account+agreement_send:account+agreement_write:account+library_read:account+library_write:account+user_login:account+user_read:account+user_write:account+webhook_read:account+webhook_retention:account+webhook_write:account+widget_read:account+widget_write:account+workflow_read:account+workflow_write";

var grant_type = "authorization_code"

var submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", () => {
	var client_id = document.getElementById("clientId").value;
	if (client_id && client_id.trim().length) {
		localStorage.setItem('client_id', client_id);
		submitBtn.value = "";
		getAuthorizationCode();
	}
});


function getAuthorizationCode() {
	var url = "https://secure.na1.echosign.com/public/oauth";
	var client_id = localStorage.getItem("client_id");
	
	console.log(client_id);
	if (client_id && client_id.trim().length) {
		var urlParams = "?redirect_uri=" + redirect_uri + 
				"&response_type=" + response_type + 
				"&client_id=" + client_id +
				"&scope=user_login:self+agreement_write:account+agreement_send:account:widget_write:account";

		document.getElementById("signIn").href = url + urlParams;
		
	}
}



function getAccessToken() {

	var url = "https://api.na2.echosign.com/oauth/token";
	var urlParams = "?grant_type=authorization_code&client_id=CBJCHBCAABAAC-U7Qyp9MHLMtUI2VFCdHSreCjnPS_NR&client_secret=sxZOMlP4bucfkVwRho5yfU1U1pLUyWgv&redirect_uri=https://example.com/oauthDemo&code=CBNCKBAAHBCAABAA4Yu-Ob_h4dfN843wTEUjhPl2SVs9thLX";
	fetch(
		url + urlParams,
		{
			method: "POST",
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		}
	).then(res => res.json()).then(console.log)
}

