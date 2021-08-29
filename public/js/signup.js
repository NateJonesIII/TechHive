// Pull user info from signup page
async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#user').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
  const twitter = document.querySelector('#twitter').value.trim();
  const github = document.querySelector('#git').value.trim();
  // if each label has input sync with api
  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        email,
        twitter,
        github,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    // Check if res was successful if not alert
    if (response.ok) {
      console.log('success');
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);