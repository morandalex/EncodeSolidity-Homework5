//ui import
import { Heading, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
export default function Home() {
    return (
        <>
            <Heading>
                Encode solidity frontend for lottery - Project week 5 - Group 4
            </Heading>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Group User</Th>
                            <Th>Github</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>Alessandro Morandi</Td>
                            <Td></Td>
                            <Td>0xb91bc2a105c03667930b5ebe639e7914c5763bdb</Td>
                        </Tr>
                        <Tr>
                            <Td>José Henrique K. Ambiel</Td>
                            <Td></Td>
                            <Td>0x6dE6EAfDD0120279957fB3019b0eec1828D73cDa</Td>
                        </Tr>
                        <Tr>
                            <Td>Marcello Rigotti</Td>
                            <Td></Td>
                            <Td>0x80d0430c7d1ed613ea30c02663cc9ce5bbc389a8</Td>
                        </Tr>
                        <Tr>
                            <Td>Sobhan BAhrami</Td>
                            <Td></Td>
                            <Td>0x4d7c99e0d0672abc0e9bbd4f5f82a87f2b6956da</Td>
                        </Tr>
                        <Tr>
                            <Td>Jeremy Bernard</Td>
                            <Td></Td>
                            <Td>0xc87a65ce2f3bb07c7a59ac0643a56e34a9d531a7</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
}