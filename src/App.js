import { CubeProvider } from "@cubejs-client/react";
import Linechart from "./components/CustomeLinechart";
import Barchart from "./components/CustomeBarchart";
import Areachart from "./components/CustomeAreachart";
import cube from "@cubejs-client/core";


const App = () => {

    const cubeApi = cube(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjU5ODQ1MzV9.tuD5LbyUombmfs4kEyAuo63BP0_4kd800Ursc_mmPCk",
        {
          apiUrl:
            "https://exciting-marmot.aws-us-east-1.cubecloudapp.dev/user/rutikkhandekar123%40gmail.com/1/cubejs-api/v1",
        }
      );

    return (
       <CubeProvider cubeApi={cubeApi}>
          <Linechart/>
          <Barchart/>
          <Areachart/>
       </CubeProvider>
    )
}

export default App;