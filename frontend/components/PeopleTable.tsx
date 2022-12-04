//ui import
import { Heading, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import utils from "../src/utils";
export default function PeopleTable() {
    const peopleData = [
        {
            name: "Alessandro Morandi",
            website: "https://www.abeatbeyond.com/",
            githubHandle: "morandalex",
            address: "0xb91bc2a105c03667930b5ebe639e7914c5763bdb"
        },
        {
            name: "José Henrique K. Ambiel",
            website: "",
            githubHandle: "",
            address: "0x6dE6EAfDD0120279957fB3019b0eec1828D73cDa"
        },
        {
            name: "Marcello Rigotti",
            website: "",
            githubHandle: "",
            address: "0x80d0430c7d1ed613ea30c02663cc9ce5bbc389a8"
        },
        {
            name: "Sobhan BAhrami",
            website: "",
            githubHandle: "",
            address: " 0x4d7c99e0d0672abc0e9bbd4f5f82a87f2b6956da"
        },
        {
            name: " Jeremy Bernard",
            website: "",
            githubHandle: "",
            address: "0xc87a65ce2f3bb07c7a59ac0643a56e34a9d531a7"
        }
    ]
    return (
        <TableContainer>
            <Table size='sm'>
                <Thead>
                    <Tr>
                        <Th>Group Users</Th>
                        <Th>Github</Th>
                        <Th>Address used</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {/* this is an example on how to render an array in a react component. We use es javascript function .map */}
                    {peopleData && peopleData.map((item,i) => {
                        return (
                            <Tr key="i"> {/* we have to specify the id of the ocmponent , if not , react will throw an error in console*/}
                                <Td>
                                    <Link href={item.website} isExternal>
                                        <ExternalLinkIcon mx='2px' /> {item.name}</Link></Td>
                                <Td>
                                    <Link href={"https://github.com/" + item.githubHandle} isExternal>
                                        <ExternalLinkIcon mx='2px' /> {item.githubHandle}
                                    </Link>
                                </Td>
                                <Td><Link href={"https://goerli.etherscan.io/address/" + item.address} isExternal><ExternalLinkIcon mx='2px' /> {utils.cutAddress(item.address)}</Link></Td>
                            </Tr>
                        )
                    })
                    }
                </Tbody>
            </Table>
        </TableContainer>
    );
}