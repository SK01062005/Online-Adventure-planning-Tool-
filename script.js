document.addEventListener('DOMContentLoaded', function () {
    // Get references to DOM elements
    const destinationSelect = document.getElementById('destination-select');
    const adventureOptions = document.getElementById('adventure-options');
    const activityCheckboxes = document.querySelectorAll('input[name="activity"]');
    const errorMessage = document.getElementById('error-message');

    // Add event listeners to activity checkboxes
    activityCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            generateAdventureOptions(destinationSelect.value);
        });
    });

    // Add an event listener to the destination select
    destinationSelect.addEventListener('change', function () {
        generateAdventureOptions(destinationSelect.value);
    });

    // Initial load
    generateAdventureOptions(destinationSelect.value);

    function generateAdventureOptions(destination) {
        const selectedActivities = Array.from(activityCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        // In a real application, you would fetch data from a server based on the destination and activities.
        // For this example, we'll use a placeholder object to simulate data retrieval.
        const adventureData = getAdventureData(destination, selectedActivities);

        if (adventureData) {
            // Clear any previous error message
            errorMessage.textContent = '';

            // Generate adventure options based on retrieved data
            const options = generateOptionsHTML(adventureData);

            adventureOptions.innerHTML = options;
        } else {
            // Display an error message if data retrieval fails
            adventureOptions.innerHTML = '';
            errorMessage.textContent = 'Failed to retrieve adventure data. Please try again later.';
        }
    }

    // Simulate data retrieval based on destination and activities
    function getAdventureData(destination, activities) {
        // Placeholder data for destinations and their adventures
        const destinationsData = {
            'Mountain Adventures': {
                activities: ['Hiking', 'Camping', 'Rock Climbing'],
                options: ['Mountain Hike', 'Camping in the Mountains', 'Rock Climbing Adventure'],
            },
            'Beach Getaways': {
                activities: ['Swimming', 'Surfing', 'Snorkeling'],
                options: ['Relax on the Beach', 'Surfing Experience', 'Snorkeling Adventure'],
            },
            'Forest Retreats': {
                activities: ['Wildlife Spotting', 'Hiking', 'Photography'],
                options: ['Wildlife Exploration', 'Forest Hiking Tour', 'Nature Photography'],
            },
        };

        // Simulate data retrieval and processing
        const selectedDestination = destinationsData[destination];

        if (selectedDestination) {
            const filteredOptions = selectedDestination.options.filter(option =>
                activities.includes(option)
            );

            return filteredOptions;
        } else {
            return null;
        }
    }

    // Generate HTML for adventure options
    function generateOptionsHTML(adventureData) {
        if (adventureData.length > 0) {
            const adventureListItems = adventureData.map(option => `<li>${option}</li>`).join('');
            return `<ul>${adventureListItems}</ul>`;
        } else {
            return `<p>No adventures available for the selected activities.</p>`;
        }
    }
});
