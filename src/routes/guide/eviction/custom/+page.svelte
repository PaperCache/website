<script lang="ts">
	import Content from "$lib/components/Content.svelte";
	import Code from "$lib/components/Code.svelte";
	import Tag from "$lib/components/Tag.svelte";
	import links from "$lib/data/links.json";
</script>

<p>PaperCache makes it easy to implement your own eviction policies. Here, we describe how to add a custom eviction policy to PaperCache by implementing the <Tag>LRU</Tag> eviction policy.</p>

<ol>
	<li>
		<p>Add our new policy as an enum entry in <Tag href={`${links.githubBase}/paper-cache/blob/main/src/policy.rs`}>paper-cache/src/policy.rs</Tag>, following existing examples.</p>
	</li>

	<li>
		<p>Add the file <Tag>lru_stack.rs</Tag> to <Tag href={`${links.githubBase}/paper-cache/blob/main/src/worker/policy/policy_stack/`}>paper-cache/src/worker/policy/policy_stack/</Tag>.</p>
	</li>

	<li>
		<p>Create a struct to hold the state of the custom eviction policy. In this case, we will hold all the keys in LRU order in a <Tag href="https://github.com/KiaShakiba/kwik/blob/main/src/collections/hash_list.rs">HashList</Tag> (i.e., doubly-linked list + hash table for <i>O(1)</i> operations) from the <Tag href="https://crates.io/crates/kwik">kwik</Tag> library:</p>
		<Code lang="rust" numbers code={`
			use kwik::collections::HashList;
			use crate::{HashedKey, NoHasher};

			#[derive(Default)]
			pub struct LruStack {
				stack: HashList<HashedKey, NoHasher>,
			}
		`} />
		<p>We disable hashing in the <Tag href="https://github.com/KiaShakiba/kwik/blob/main/src/collections/hash_list.rs">HashList</Tag> as the keys are pre-hashed by the cache.</p>
	</li>

	<li>
		<p>Implement the <Tag href={`${links.githubBase}/paper-cache/blob/main/src/worker/policy/policy_stack/mod.rs`}>PolicyStack</Tag> trait for our new struct:</p>
		<Code lang="rust" numbers code={`
			use crate::{
				policy::PaperPolicy,
				object::ObjectSize,
				worker::policy::policy_stack::PolicyStack,
			};

			impl PolicyStack for LruStack {
				/// A utility function used internally by PaperCache.
				fn is_policy(&self, policy: PaperPolicy) -> bool {
					matches!(policy, PaperPolicy::Lru)
				}

				/// Returns the number of keys in the stack.
				fn len(&self) -> usize {
					self.stack.len()
				}

				/// Checks if the supplied key exists in the stack.
				fn contains(&self, key: HashedKey) -> bool {
					self.stack.contains(&key)
				}

				/// Inserts a new key into the stack. Be sure to not have duplicate keys
				/// and do not perform any evictions here. In the case of LRU, we do not
				/// need to use the object size, though in other policies it may be required.
				fn insert(&mut self, key: HashedKey, _: ObjectSize) {
					if self.stack.contains(&key) {
						return self.update(key);
					}

					self.stack.push_front(key);
				}

				/// Updates an existing key in the stack. In this case, move the key
				/// to the front of the stack.
				fn update(&mut self, key: HashedKey) {
					self.stack.move_front(&key);
				}

				/// Remove the supplied key from the stack.
				fn remove(&mut self, key: HashedKey) {
					self.stack.remove(&key);
				}

				/// Clear the stack.
				fn clear(&mut self) {
					self.stack.clear();
				}

				/// Perform one eviction from the stack.
				fn evict_one(&mut self) -> Option<HashedKey> {
					self.stack.pop_back();
				}
			}
		`} />
		<p>Although not strictly necessary, adding tests to ensure your stack is working correctly is a good idea here (you can find how to do this in existing examples in other policy implementations).</p>
	</li>

	<li>
		<p>Add our new policy to the <Tag>init_policy_stack</Tag> function in <Tag href={`${links.githubBase}/paper-cache/blob/main/src/worker/policy/policy_stack/mod.rs`}>paper-cache/src/worker/policy/policy_stack/mod.rs</Tag>.</p>
	</li>
</ol>

<p>Our new policy is now implemented in PaperCache!</p>

<style lang="scss">
	i {
		font-style: italic;
	}
</style>
