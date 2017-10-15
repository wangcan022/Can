document.getElementById("btn").addEventListener("click", myFunction);
document.getElementById("alert").style.visibility = "hidden"

function myFunction() {
    try {
		
        var spring = 0
        var summer = 0
        var autumn = 0
        var winter = 0
        var volcanoTable = $('#rainfall-data').find('table tr');
        for (var i = 0; i < volcanoTable.length; i++) {
            var row = volcanoTable[i];
            var columns = $(row).find('td');
            var label = columns[0].innerText;
            if (label == "September" || label == "October" || label == "November") {
                spring = spring + parseFloat(columns[1].innerText);
            }
            if (label == "December" || label == "January" || label == "February") {
                summer = summer + parseFloat(columns[1].innerText);
            }

            if (label == "March" || label == "April" || label == "May") {
                autumn = autumn + parseFloat(columns[1].innerText);
            }
            if (label == "June" || label == "July" || label == "August") {
                winter = winter + parseFloat(columns[1].innerText);
            }
        }
		document.getElementById("alert").style.visibility = "hidden"
		
        var roof = document.getElementById("roof").value;
        //Check if the roof is number or not; Check if there is rainfall data
        if (!isNaN(roof) && roof > 0 && spring != 0) {
            
            document.getElementById("label").style.color = "#2e4453"; //Change back the color	
			

            var sumCol = summer * roof * 0.95
            var autCol = autumn * roof * 0.95
            var winCol = winter * roof * 0.95
            var sprCol = spring * roof * 0.95

            var livestock = parseFloat(removeCommas(document.getElementById("fieldname8_1").value)) / 4;
            var sumCropUsage = parseFloat(document.getElementById("fieldname50_2").value)
            var autCropUsage = parseFloat(document.getElementById("fieldname51_2").value)
            var winCropUsage = parseFloat(document.getElementById("fieldname52_2").value)
            var sprCropUsage = parseFloat(document.getElementById("fieldname53_2").value)

            var sumGetFromRain = parseFloat(document.getElementById("fieldname46_2").value) * summer * 0.5
            var autGetFromRain = parseFloat(document.getElementById("fieldname47_2").value) * summer * 0.5
            var winGetFromRain = parseFloat(document.getElementById("fieldname48_2").value) * summer * 0.5
            var sprGetFromRain = parseFloat(document.getElementById("fieldname49_2").value) * summer * 0.5

            var sumRequire = ((sumCropUsage - sumGetFromRain) > 0 ? (sumCropUsage - sumGetFromRain) : 0) + livestock
            var autRequire = ((autCropUsage - autGetFromRain) > 0 ? (autCropUsage - autGetFromRain) : 0) + livestock
            var winRequire = ((winCropUsage - winGetFromRain) > 0 ? (winCropUsage - winGetFromRain) : 0) + livestock
            var sprRequire = ((sprCropUsage - sprGetFromRain) > 0 ? (sprCropUsage - sprGetFromRain) : 0) + livestock

            var sumLeft = sumCol - sumRequire
            var sumSize = 0
            var sumSaved = 0
            var sumCheck = true
            if (sumLeft > 0) {
                sumSize = sumRequire
                sumSaved = sumRequire
            } else {
                sumSize = sumRequire
                sumCheck = false
                sumSaved = sumCol
            }

            var autSize = 0
            var autSaved = 0
            var autNewCol = autCol + ((sumLeft > 0) ? sumLeft : 0)
            var autLeft = autNewCol - autRequire
            var autCheck = true
            if (autLeft > 0) {
                autSize = autRequire
                autSaved = autRequire
            } else {
                autSize = autRequire
                autCheck = false
                autSaved = autNewCol
            }

            var winSize = 0
            var winSaved = 0
            var winNewCol = winCol + ((autLeft > 0) ? autLeft : 0)
            var winLeft = winNewCol - winRequire
            var winCheck = true
            if (winLeft > 0) {
                winSize = winRequire
                winSaved = winRequire
            } else {
                winSize = winRequire
                winCheck = false
                winSaved = winNewCol
            }

            var sprSize = 0
            var sprSaved = 0
            var sprNewCol = sprCol + ((winLeft > 0) ? winLeft : 0)
            var sprLeft = sprNewCol - sprRequire
            var sprCheck = true
            if (sprLeft > 0) {
                sprSize = sprRequire
                sprSaved = sprRequire
            } else {
                sprSize = sprRequire
                sprCheck = false
                sprSaved = sprNewCol
            }
            

            var finalSize1 = 0
            var finalSize2 = 0
            var finalSize = 0
            if (sumSize >= autSize) {
                finalSize1 = sumSize
            } else {
                finalSize1 = autSize
            }
            if (winSize >= sprSize) {
                finalSize2 = winSize
            } else {
                finalSize2 = sprSize
            }
            if (finalSize1 >= finalSize2) {
                finalSize = finalSize1
            } else {
                finalSize = finalSize2
            }
			
            if (!sumCheck || !autCheck || !winCheck || !sprCheck) {
                document.getElementById("label").innerHTML = numberWithCommas(finalSize) + 'L';
				document.getElementById("alert").innerHTML = '<strong>Warning:</strong> Based on the size of your roof, you may experience water shortage. You may need to increase the size of your roof, fill in your water tank with water trucks, use tap water, or lower your water requirements.';
                document.getElementById("alert").style.visibility = "visible"
			} else {
                document.getElementById("label").innerHTML = numberWithCommas(finalSize) + 'L';
            }
            
            var sumPrice = 0
            var autPrice = 0
            var winPrice = 0
            var sprPrice = 0
            var totalPrice = 0

            if (sumSaved <= 440 * 90) {
                sumPrice = sumSaved * 2.6651
            } else if (sumSaved > 440 * 90 && sumSaved <= 880 * 90) {
                sumPrice = sumSaved * 3.2366
            } else {
                sumPrice = sumSaved * 3.8615
            }

            if (autSaved <= 440 * 90) {
                autPrice = autSaved * 2.6651
            } else if (autSaved > 440 * 90 && autSaved <= 880 * 90) {
                autPrice = autSaved * 3.2366
            } else {
                autPrice = autSaved * 3.8615
            }

            if (winSaved <= 440 * 90) {
                winPrice = winSaved * 2.6651
            } else if (winSaved > 440 * 90 && winSaved <= 880 * 90) {
                winPrice = winSaved * 3.2366
            } else {
                winPrice = winSaved * 3.8615
            }

            if (sprSaved <= 440 * 90) {
                sprPrice = sprSaved * 2.6651
            } else if (winSaved > 440 * 90 && winSaved <= 880 * 90) {
                sprPrice = sprSaved * 3.2366
            } else {
                sprPrice = sprSaved * 3.8615
            }
            
            if (finalSize != 0) {
                totalPrice = sumPrice + autPrice + winPrice + sprPrice
                document.getElementById("saving").innerHTML = '$' + numberWithCommas(round((totalPrice / 1000), 2));
            }
            
            if (finalSize == 0) {
                document.getElementById("label").innerHTML = 'No water usage, you do not need a water tank!';
                document.getElementById("saving").innerHTML = '$0';
                document.getElementById("img1").style.visibility = "hidden"
                document.getElementById("cap1").style.visibility = "hidden"
                document.getElementById("img2").style.visibility = "hidden"
                document.getElementById("cap2").style.visibility = "hidden"
                document.getElementById("img3").style.visibility = "hidden"
                document.getElementById("cap3").style.visibility = "hidden"
            } else if (finalSize <= 5000) {
                document.getElementById("img1").src = "https://irp-cdn.multiscreensite.com/db9afa27/dms3rep/multi/mobile/Od8BOX91Qq17IxSf5ZC1_3000%20Litre%20Slimline%20Poly%20Tank%202-346x219.png"
                document.getElementById("img1").style.visibility = "visible"
                document.getElementById("cap1").style.visibility = "visible"
                document.getElementById("cap1").innerHTML = "Slimline tanks (Max Size: 5,000L)"

                document.getElementById("img2").src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV-R4htE4bk5DA58l-7fcYZU-N6vsAol3MBgu4Hr9SXILLi0gf"
                document.getElementById("img2").style.visibility = "visible"
                document.getElementById("cap2").style.visibility = "visible"
                document.getElementById("cap2").innerHTML = "Underground Tanks (Max Size: 5,000L)"

                document.getElementById("img3").src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWfJDYEnrvVLgSQHBC0Vlp917EupX1Zv7Gb56n8xf4H3ZWl82w0A"
                document.getElementById("img3").style.visibility = "visible"
                document.getElementById("cap3").style.visibility = "visible"
                document.getElementById("cap3").innerHTML = "Underground Tanks (Max Size: 5,000L)"
            } else if (finalSize > 5000 && finalSize <= 7000) {
                document.getElementById("img1").src = "data:image/jpeg;base64,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"
                document.getElementById("img1").style.visibility = "visible"
                document.getElementById("cap1").style.visibility = "visible"
                document.getElementById("cap1").innerHTML = "Modline tanks (Max Size: 7,000L)"

                document.getElementById("img2").src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXd-L2Oy_2MfbwBVa_MMTIRY3s1_YOpcUBJVoNtavuAdgR7zez_A"
                document.getElementById("img2").style.visibility = "visible"
                document.getElementById("cap2").style.visibility = "visible"
                document.getElementById("cap2").innerHTML = "Square tanks (Max Size: 7,000L)"

                document.getElementById("img3").style.visibility = "hidden"
                document.getElementById("cap3").style.visibility = "hidden"
            } else if (finalSize > 7000 && finalSize <= 8000) {
                document.getElementById("img1").src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1yQWpOmLU_nJTWAUdBQsHxOBJnMn5gE9b6zhioY7MsBOeKoe9fQ"
                document.getElementById("img1").style.visibility = "visible"
                document.getElementById("cap1").style.visibility = "visible"
                document.getElementById("cap1").innerHTML = "Slimline tanks (Max Size: 8,000L)"

                document.getElementById("img3").style.visibility = "hidden"
                document.getElementById("cap3").style.visibility = "hidden"
            } else if (finalSize > 8000 && finalSize <= 34000) {
                document.getElementById("img1").src = "https://www.asctanks.com.au/wp-content/uploads/tankmasta-ta20000.jpg"
                document.getElementById("img1").style.visibility = "visible"
                document.getElementById("cap1").style.visibility = "visible"
                document.getElementById("cap1").innerHTML = "Round Tanks (Max Size: 34,000L)"

                document.getElementById("img2").src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrT_GWlE6ilAHjKzbbXp4KhjCYxHlV8P-nviWW_JHwPe0BR49t1A"
                document.getElementById("img2").style.visibility = "visible"
                document.getElementById("cap2").style.visibility = "visible"
                document.getElementById("cap2").innerHTML = "Round tanks (Max Size: 27,000L)"

                document.getElementById("img3").style.visibility = "hidden"
                document.getElementById("cap3").style.visibility = "hidden"
            } else {
				
                var number = Math.ceil(finalSize / 34000)
                document.getElementById("label").innerHTML = numberWithCommas(finalSize) + "L" + "<br>" + "You may need " + numberWithCommas(number) + " of the recommended water tanks"
				
                document.getElementById("img1").src = "https://www.asctanks.com.au/wp-content/uploads/tankmasta-ta20000.jpg"
                document.getElementById("img1").style.visibility = "visible"
                document.getElementById("cap1").style.visibility = "visible"
                document.getElementById("cap1").innerHTML = "Round Tanks (Max Size: 34,000L)"

                document.getElementById("img2").style.visibility = "hidden"
                document.getElementById("cap2").style.visibility = "hidden"
                document.getElementById("img3").style.visibility = "hidden"
                document.getElementById("cap3").style.visibility = "hidden"
            }
        } else {
		
			document.getElementById("saving").innerHTML = '';
			document.getElementById("alert").style.visibility = "hidden"
            if (spring == 0) {
                document.getElementById("label").innerHTML = 'Please select a weather station';
            } else {
                document.getElementById("label").innerHTML = 'Input is not valid';
            }
            document.getElementById("label").style.color = "#e60000";
            document.getElementById("img1").style.visibility = "hidden"
            document.getElementById("cap1").style.visibility = "hidden"
            document.getElementById("img2").style.visibility = "hidden"
            document.getElementById("cap2").style.visibility = "hidden"
            document.getElementById("img3").style.visibility = "hidden"
            document.getElementById("cap3").style.visibility = "hidden"

        }
    } catch (err) {
		
		document.getElementById("saving").innerHTML = '';
		document.getElementById("alert").style.visibility = "hidden"
        if (spring > 0) {
            document.getElementById("label").innerHTML = 'Please calculate the water requirements first';
            document.getElementById("label").style.color = "#e60000";
        } else {
            document.getElementById("label").innerHTML = 'Please select a weather station';
            document.getElementById("label").style.color = "#e60000";
        }
    }

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function removeCommas(str) {
    while (str.search(",") >= 0) {
        str = (str + "").replace(',', '');
    }
    return str;
}
