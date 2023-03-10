import React from 'react'
import { Component } from 'react'
import { Link } from 'react-router-dom'
class NotFound extends Component
{
  render(){
    return( <div >

      <h1 className="text-2xl font-medium">Sorry, this page isn't available.</h1>
              <p className="text-md">The link you followed may be broken, or the page may have been removed.
                  <Link to="/" className="text-blue-900"> Go back to BookingWebsite.</Link>
              </p>
              <Link to="/" className="bg-primary-blue px-4 py-2 text-white font-medium rounded hover:drop-shadow-lg">Go to Home</Link>
          </div>)
  }
}

 

export default NotFound