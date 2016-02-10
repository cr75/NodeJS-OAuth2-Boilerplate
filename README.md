# NodeJS-OAuth2-Boilerplate
This application is an API for simple blog system. Main tools used are
* Node.js
* Express Framework
* MongoDB
* Mongoose

### DB Schema
**User**

<table>
	<tr>
		<th>Field Name</th>
		<th>Type</th>
		<th>Description</th>
	</tr>
	<tr>
		<td>firstName</td>
		<td>String</td>
		<td></td>
	</tr>
	<tr>
		<td>lastName</td>
		<td>String</td>
		<td></td>
	</tr>
	<tr>
		<td>email</td>
		<td>String</td>
		<td></td>
	</tr>
	<tr>
		<td>username</td>
		<td>String</td>
		<td>unique value</td>
	</tr>
	<tr>
		<td>password</td>
		<td>String</td>
		<td></td>
	</tr>
	<tr>
		<td>salt</td>
		<td>String</td>
		<td>used to encrypt password</td>
	</tr>
	<tr>
		<td>provider</td>
		<td>String</td>
		<td>for Passport package. It will be "local" in our case.</td>
	</tr>
	<tr>
		<td>created</td>
		<td>String</td>
		<td></td>
	</tr>
</table>