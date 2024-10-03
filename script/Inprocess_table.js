
$(document).ready(function () {
    
    var inProcessTicket = JSON.parse(localStorage.getItem('inProcessTicket'));
    const rowDetails = [
        {
            ticketID: '001',
            address: 'KING SQUARE OLD NO.1 NEW NO.2, PLOT B 31, 6th Ave, Ashok Nagar, Chennai, Tamil Nadu 600083',
            description: 'AC issue with cooling.',
            issueType: 'ac', // Add issueType
            customerName: 'Rohith', // Add customerName
            phone: '01234 56789', // Add phone
            date: '12/12/2024', // Add date
            city: 'Chennai',
            employees: [
                { name: 'Ganesh', pending: 3 },
                { name: 'Rohith', pending: 6 }, // More than 5, should be disabled
                { name: 'Meera', pending: 2 }
            ]
        },
        {
            ticketID: '002',
            address: 'No. 45, Second St, Besant Nagar, Chennai, Tamil Nadu 600090',
            description: 'Fridge issue.',
            issueType: 'Fridge', // Add issueType
            customerName: 'Karthik', // Add customerName
            phone: '01234 56789', // Add phone
            date: '12/12/2024', // Add date
            city: 'Chennai',
            employees: [
                { name: 'Ganesh', pending: 4 },
                { name: 'Rohith', pending: 5 },
                { name: 'Meera', pending: 1 }
            ]
        },
        {
            ticketID: '003',
            address: 'No. 45, Second St, Besant Nagar, Chennai, Tamil Nadu 600090',
            description: 'Fridge issue.',
            issueType: 'Fridge', // Add issueType
            customerName: 'Sharma', // Add customerName
            phone: '01234 56789', // Add phone
            date: '13/12/2024', // Add date
            city: 'Besant Nagar',
            employees: [
                { name: 'Ganesh', pending: 4 },
                { name: 'Rohith', pending: 5 },
                { name: 'Meera', pending: 1 }
            ]
        }
    ];
    var assignedEmployee = rowDetails[0].employees[0].name;
    if (inProcessTicket) {
        rowDetails.push({
            ...inProcessTicket, // Keep other ticket details
            employee: inProcessTicket.employee  // Ensure employee is set
        });
        var newRow = `
            <tr class="main-row" data-ticket-id="${inProcessTicket.ticketID}">
                <td class="details-control" style="cursor: pointer;"></td> <!-- Control for expanding/collapsing -->
                <td>${inProcessTicket.ticketID}</td>
                <td><div class="issue-type ${inProcessTicket.issueType.toLowerCase()}"><span class="circle"></span> ${inProcessTicket.issueType}</div></td>
                <td>${inProcessTicket.customerName}</td>
                <td>${inProcessTicket.phone}</td>
                <td>${inProcessTicket.date}</td>
                <td>${inProcessTicket.city}</td>
                <td class="assigned-employee">-</td> <!-- Initialize assigned employee column -->
            </tr>
        `;
        $('#ticketTable tbody').append(newRow);
    }

    function format(rowData) {
       
        return `
            <tr class="collapse-content details-row" data-ticket-id="${rowData.ticketID}">
                <td colspan="8">
                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-4">
                            <strong class="d-flex justify-content-left">Customer Address</strong>
                            <p class="pt-2" style="font-size: 13px;text-align: left; address">${rowData.address}</p>
                            <label class="mt-3 d-flex justify-content-left">Employee Name</label>
                            <select class="form-select mt-2 employee-select">
                                <option value="${assignedEmployee}" selected>${assignedEmployee}</option>
                                ${rowData.employees.map(employee => `
                                    <option value="${employee.name}" ${employee.pending > 5 ? 'disabled' : ''}>
                                        ${employee.name}
                                    </option>
                                `).join('')}
                            </select>
                            <small>Pending work: <span class="pending-work">${rowData.employees[0].pending}</span></small>
                        </div>
                        <div class="col-md-6">
                            <strong>Description:</strong>
                            <p class="description">${rowData.description}</p>
                            <div>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="image-gallery">
                                            <img src="images/profile img.png" alt="Image 1" width="100px">
                                            <div class="image-container">
                                                <img src="images/profile img.png" alt="Image 1">
                                                <div class="overlay">+3</div>
                                            </div>
                                            <div class="thumbnail-container" id="additional-images" style="display: none;">
                                                <img src="images/profile img.png" alt="Additional Image 1">
                                                <img src="images/profile img.png" alt="Additional Image 2">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="button-container">
                                            <button class="btn btn-assign">Reassign</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>`;
    }

    // Initialize DataTable for unassigned tickets
    var table = $('#ticketTable').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true
    });
    function addTicket(ticket) {
        // Check if a ticket with the same ID already exists
        const existingTicket = rowDetails.find(t => t.ticketID === ticket.ticketID);
        
        if (!existingTicket) {
            // Add to the rowDetails array
            rowDetails.push(ticket);
            
            // Add the new ticket to the DataTable
            table.row.add([
                ticket.ticketID,
                `<div class="issue-type ${ticket.issueType.toLowerCase()}"><span class="circle"></span> ${ticket.issueType}</div>`,
                ticket.customerName,
                ticket.phone,
                ticket.date,
                ticket.city,
                '-' // Placeholder for assigned employee
            ]).draw(false); // Use draw(false) to maintain pagination
        } else {
            console.log(`Ticket with ID ${ticket.ticketID} already exists.`);
        }
    }

    // Add the new ticket if it exists in localStorage
    if (inProcessTicket) {
        addTicket(inProcessTicket);
    }
    // Expand row details on click
    $('#ticketTable tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);
        var ticketID = tr.find('td:nth-child(2)').text(); 
        var details = rowDetails.find(detail => detail.ticketID === ticketID);

        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
        } else {
            row.child(format(details)).show();
            tr.addClass('shown');
        }
    });

    $('#ticketTable tbody tr').each(function () {
        const ticketID = $(this).find('td:nth-child(2)').text();
        const details = rowDetails.find(detail => detail.ticketID === ticketID);

        // Set initial assigned employee in the table's main row
        if (details && details.employees.length > 0) {
            const initialEmployee = details.employees[0].name;
            $(this).find('.assigned-employee').text(initialEmployee);
        }
    });

    $('#ticketTable tbody').on('click', '.btn-assign', function () {
        $(this).closest('.details-row').find('.employee-select').prop('disabled', false);
    });

    // Update the assigned employee only when the "Reassign" button is clicked
    $('#ticketTable tbody').on('change', '.employee-select', function () {
        const selectedEmployee = $(this).val();
        const detailsRow = $(this).closest('tr.details-row');
        const ticketID = detailsRow.data('ticket-id');

        // Find the corresponding main row based on the ticket ID
        const mainRow = $(`#ticketTable tbody tr:not(.details-row)`).filter(function () {
            return $(this).find('td:nth-child(2)').text() === ticketID;
        });

        // Set the new employee in a variable to update later
        detailsRow.data('selected-employee', selectedEmployee);
    });

    // Assign the selected employee to the main row when "Reassign" is clicked
    $('#ticketTable tbody').on('click', '.btn-assign', function () {
        const detailsRow = $(this).closest('tr.details-row');
        const selectedEmployee = detailsRow.data('selected-employee');
        const ticketID = detailsRow.data('ticket-id');
        assignedEmployee=selectedEmployee;
        // Find the corresponding main row based on the ticket ID
        const mainRow = $(`#ticketTable tbody tr:not(.details-row)`).filter(function () {
            return $(this).find('td:nth-child(2)').text() === ticketID;
        });

        // Update the assigned employee in the main table row
        if (selectedEmployee) {
            mainRow.find('.assigned-employee').text(selectedEmployee);
        }

        // Disable the button after reassigning
        $(this).prop('disabled', true);
    });
});







