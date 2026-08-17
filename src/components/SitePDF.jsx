import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";


const styles = StyleSheet.create({

  page: {

    padding: 24,

    fontSize: 10,

    backgroundColor: "#ffffff",

  },


  title: {

    fontSize: 18,

    fontWeight: "bold",

    marginBottom: 10,

  },


  section: {

    marginBottom: 15,

    padding: 12,

    borderRadius: 8,

    border: "1 solid #dddddd",

  },


  row: {

    flexDirection: "row",

    justifyContent: "space-between",

  },


  label: {

    color: "#666666",

  },


  value: {

    fontWeight: "bold",

  },


  link: {

    color: "#f15c26",

  },


  map: {

    width: "100%",

    height: 300,

    objectFit: "contain",

    marginTop: 10,

  },


});



export default function SitePDF({ site }) {


  const metrics =
    site?.footer?.keyMetrics || {};



  const activities =
    site?.footer?.activities || [];



  const header =
    site?.header || {};



  const mapURL =
    site?.map?.image || "";



  return (


    <Document>


      <Page
        size="A4"
        style={styles.page}
      >


        <Text style={styles.title}>

          {header.siteName || "Site Card"}

        </Text>



        <View style={styles.section}>


          <Text>

            Site Status: {header.status || "--"}

          </Text>


          <Text>

            Location: {header.location?.name || "--"}

          </Text>


        </View>




        <View style={styles.section}>


          <Text>

            Site Intelligence

          </Text>



          <Text>

            Capacity:
            {metrics.totalCapacity || "--"}

          </Text>



          <Text>

            Area:
            {metrics.totalArea || "--"}

          </Text>



          <Text>

            Blocks:
            {metrics.totalBlocks || "--"}

          </Text>



          <Text>

            ICRs:
            {metrics.totalICRs || "--"}

          </Text>



        </View>






        <View style={styles.section}>


          <Text>

            Activities on Site

          </Text>


          {

            activities.map(

              (item,index)=>(

                <Text key={index}>

                  • {item}

                </Text>

              )

            )

          }


        </View>





        {
          header.spectra?.url &&

          <Link

            src={header.spectra.url}

            style={styles.link}

          >

            Open Spectra

          </Link>

        }



        {
          header.flightHub?.url &&

          <Link

            src={header.flightHub.url}

            style={styles.link}

          >

            Open FlightHub

          </Link>

        }





        {
          mapURL &&

          <Image

            src={mapURL}

            style={styles.map}

          />

        }





      </Page>


    </Document>


  );

}