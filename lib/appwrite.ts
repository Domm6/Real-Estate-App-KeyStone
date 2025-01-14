import { Client, Avatars, Account, OAuthProvider } from 'react-native-appwrite';
import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';

// Configuration object for Appwrite setup
export const config = {
    // Unique identifier for your app platform
    platform: 'com.jsm.keystone',
    // Appwrite server endpoint from environment variables
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    // Your Appwrite project ID from environment variables
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

// Initialize Appwrite client
export const client = new Client();

// Configure the Appwrite client with necessary settings
client
    .setEndpoint(config.endpoint!)
    .setProject(config.projectId!)
    .setPlatform(config.platform!)

// Initialize Appwrite services

// Avatar service for user profile pictures
export const avatar = new Avatars(client);
// Account service for user authentication and management
export const account = new Account(client);

/**
 * Handles the OAuth authentication flow with Google
 * @returns {Promise<boolean>} Returns true if login is successful, false otherwise
 */
export async function login() {
    try {
        // Create a URL that the app will return to after authentication
        const redirectUri = Linking.createURL('/')

        // Initialize OAuth2 flow with Google
        // This creates a token that will be used to start the authentication process
        const response = await account.createOAuth2Token(
            OAuthProvider.Google,
            redirectUri
        );

        // Check if we received a valid response from createOAuth2Token
        if (!response) {
            throw new Error("Failed to login");
        } else {
            // Open the authentication webpage in a browser
            // This shows the Google login page to the user
            const browserResult = await openAuthSessionAsync(
                response.toString(),
                redirectUri
            );

            // Verify that the browser authentication was successful
            if (browserResult.type !== 'success') {
                throw new Error("Failed to login")
            }

            // Parse the URL that contains the authentication results
            const url = new URL(browserResult.url)

            // Extract authentication tokens from the URL
            // These are provided by Google after successful authentication
            const secret = url.searchParams.get('secret')
            const userId = url.searchParams.get('userId')

            // Verify that we received both required tokens
            if (!secret || !userId) {
                throw new Error("Failed to login")
            }

            // Create an Appwrite session using the tokens
            // This establishes a persistent login session for the user
            const session = await account.createSession(userId, secret)

            // Verify that the session was created successfully
            if (!session) {
                throw new Error("Failed to create a session")
            }

            // Return true to indicate successful login
            return true;

        }
    } catch (error) {
        // Log any errors that occurred during the process
        console.error(error);
        // Return false to indicate failed login
        return false;
    }
}

// gets info about current user
export async function logout() {
    try {
        await account.deleteSession('current');
        return true;
    } catch (error) {
        console.error(error)
        return false;
    }
}

export async function getCurrentUser() {
    try {
        const response = await account.get();

        // get users initals for avatar
        if (response.$id) {
            const userAvatar = avatar.getInitials(response.name)
            return {
                ...response,
                avatar: userAvatar.toString()
            }
        }

        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}