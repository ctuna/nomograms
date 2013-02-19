import static org.junit.Assert.*;

import org.junit.Test;


public class StringMasterTest {
	private StringMaster m;
	@Test
	public void testAddText() {
		m = new StringMaster();
		assertEquals(m.addText("$.00", "1"), "$.01");
		assertEquals(m.addText("$.01", "1"), "$.11");
		assertEquals(m.addText("$.11", "1"), "$1.11");
		assertEquals(m.addText("$1.11", "2"), "$11.12");

	}

	@Test
	public void testRemoveText() {
		m = new StringMaster();
		assertEquals(m.removeText("$.00"), "$.00");
		assertEquals(m.removeText("$.01"), "$.00");
		assertEquals(m.removeText("$.11"), "$.01");
		assertEquals(m.removeText("$9.87"), "$.98");

	}

}
