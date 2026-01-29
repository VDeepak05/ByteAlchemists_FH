import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-900">Sign in to KrishiSahaya</h2>
                    <p className="mt-2 text-center text-sm text-neutral-600">
                        Or <Link to="/register" className="font-medium text-primary hover:text-primary-dark">create a new account</Link>
                    </p>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="phone-number" className="sr-only">Phone Number</label>
                            <input id="phone-number" name="phone" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder="Phone Number" />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
