$(document).ready(function () {
    var rejecttedTictet = JSON.parse(localStorage.getItem('rejectedTicket'));
    let rowDetails = []; // Initialize as an empty array

    // Check if there are rejected tickets
    if (rejecttedTictet) {
        rowDetails.push(rejecttedTictet); // Push the rejected ticket
        var newRow = `
            <tr class="main-row" data-ticket-id="${rejecttedTictet.ticketID}">
                <td class="details-control" style="cursor: pointer;"></td> <!-- Control for expanding/collapsing -->
                <td>${rejecttedTictet.ticketID}</td>
                <td><div class="issue-type ${rejecttedTictet.issueType.toLowerCase()}"><span class="circle"></span> ${rejecttedTictet.issueType}</div></td>
                <td>${rejecttedTictet.customerName}</td>
                <td>${rejecttedTictet.phone}</td>
                <td>${rejecttedTictet.date}</td>
                <td>${rejecttedTictet.city}</td>
            </tr>
        `;
        $('#rejectedTicketTable tbody').append(newRow); 
        // localStorage.removeItem('rejectedTicketrestore'); // Clear the data from local storage
    }

    function format(rowData) {
        return `
            <tr class="collapse-content details-row" data-ticket-id="${rowData.ticketID}">
                <td colspan="8">
                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-4">
                            <strong class="d-flex justify-content-left">Customer Address</strong>
                            <p class="pt-2" style="font-size: 13px;text-align: left;">${rowData.address}</p>
                            <label class="mt-3 d-flex justify-content-left">Employee Name</label>
                            <select class="form-select mt-2 employee-select">
                                <option value="" selected>Select Employee</option>
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
                            <div class="button-container">
                                <button class="btn btn-reStore" disabled>Restore</button>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>`;
    }

    // Initialize DataTable for rejected tickets
    var table = $('#rejectedTicketTable').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true
    });

    // Expand row details on click
    $('#rejectedTicketTable tbody').on('click', 'td.details-control', function () {
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

    // Enable the "Restore" button when an employee is selected
    $('#rejectedTicketTable tbody').on('change', '.employee-select', function () {
        if ($(this).val()) {
            $(this).closest('.details-row').find('.btn-reStore').prop('disabled', false);
        }
    });

    // Update the assigned employee and move row to in-process table
    $('#rejectedTicketTable tbody').on('click', '.btn-reStore', function () {
        var detailsRow = $(this).closest('tr.details-row');
        var ticketID = detailsRow.data('ticket-id');
        var mainRow = $(`#rejectedTicketTable tbody tr:not(.details-row)`).filter(function () {
            return $(this).find('td:nth-child(2)').text() === ticketID;
        });

        var details = rowDetails.find(detail => detail.ticketID === ticketID);

        if (details) {
            // Add the assigned employee information to details
            var ticketData = {
                ...details, // Spread the full row details
                employee: '-'
            };

            // Store data in localStorage
            localStorage.setItem('rejectedTicketrestore', JSON.stringify(ticketData));

            // Remove the row from the rejected tickets table
            table.row(mainRow).remove().draw();
        }
      
        $(this).prop('disabled', true);
    });
});
