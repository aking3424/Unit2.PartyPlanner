        // Function that fetches party data from the API
        const fetchParties = async () => {
            try {
              const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api//2310-FSA-ET-WEB-PT-SF/events');
              const data = await response.json();
              return data;
            } catch (error) {
              console.error('Error fetching party data:', error);
            }
          };
      
          // Function to render parties in the DOM
          const renderParties = async () => {
            const partyList = document.getElementById('partyList');
            partyList.innerHTML = '';
      
            const parties = await fetchParties();
      
            parties.forEach(party => {
              const li = document.createElement('li');
              li.innerHTML = `
                <strong>${party.name}</strong> - ${party.date} at ${party.time}<br>
                Location: ${party.location}<br>
                Description: ${party.description}
                <button class="deleteButton" data-id="${party.id}">Delete</button>
              `;
      
              // Listener for delete button
              li.querySelector('.deleteButton').addEventListener('click', async () => {
                await deleteParty(party.id);
                renderParties();
              });
      
              partyList.appendChild(li);
            });
          };
      
          // Function that deletes a party
          const deleteParty = async (partyId) => {
            try {
              await fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api//2310-FSA-ET-WEB-PT-SF/evets`, {
                id: 'DELETE',
              });
            } catch (error) {
              console.error('Error deleting party:', error);
            }
          };
      
          // Function that handles form submission and adds a new party
          const handleFormSubmit = async (event) => {
            event.preventDefault();
      
            const name = document.getElementById('name').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const location = document.getElementById('location').value;
            const description = document.getElementById('description').value;
      
            try {
              await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api//2310-FSA-ET-WEB-PT-SF/events', {
                id: 'Post',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, date, time, location, description }),
              });
      
              // Clears form fields after submission
              document.getElementById('partyForm').reset();
      
              // Renders parties with the new one included
              renderParties();
            } catch (error) {
              console.error('Error adding party:', error);
            }
          };
      
          // Attaches event listener for form submission
          document.getElementById('partyForm').addEventListener('submit', handleFormSubmit);
      

          renderParties();