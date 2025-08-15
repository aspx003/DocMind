React Native Expo UI project for RAG Stack Document info retrieval and query formation.

Start the backend using: uvicorn app.main:app --reload

Update 2:
	- Removing tables as android apps don't use tables that much
  	- Also from a user's view we can just have the answers, not the data.
  	- Data can be queried later by the user once he knows the sql for it.