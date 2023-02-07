import { Component } from "react";
import './signUp.css'
class signUp extends Component{

    render(){
        return(
 <div class="signUpForm">
      <form action="api/auth/signup" method="post" class="form">
        <h1 class="title">Sign up</h1>
  
        <div class="inputContainer">
          <input type="text" class="input" name ="email" required placeholder="a"/>
          <label for="" class="label">Email</label>
        </div>
  
        <div class="inputContainer">
          <input type="text" class="input" name="username" required placeholder="a"/>
          <label for="" class="label">Username</label>
        </div>
  
        <div class="inputContainer">
          <input type="text" class="input" name="password" required minlength="8" placeholder="a"/>
          <label for="" class="label">Password</label>
        </div>
  
        <div class="inputContainer">
          <input type="text" class="input" placeholder="a"/>
          <label for="" class="label">Confirm Password</label>
        </div>
  
        <input type="submit" class="submitBtn" value="Sign up"/>
      </form>
    </div> 

        )

}
}

export default signUp;