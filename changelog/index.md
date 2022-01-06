[{"bookPath":"","title":"Changelog","titleId":"guide-changelog","hasOtp":true,"hasPageHeader":true},"<p>\n  <i id=\"p_0\" class=\"pid\"></i>Below is a list of changes to Reach.\n  Versions and changes-within-versions are listed in reverse-chronological order: newest things first.<a href=\"#p_0\" class=\"pid\">0</a>\n</p>\n<h2 id=\"017-202111---present\" class=\"refHeader\">0.1.7: 2021/11 - present<a aria-hidden=\"true\" tabindex=\"-1\" href=\"#017-202111---present\"><span class=\"icon icon-link\"></span></a></h2>\n<p><i id=\"p_1\" class=\"pid\"></i>Version 0.1.7 is the current Reach release candidate version.<a href=\"#p_1\" class=\"pid\">1</a></p>\n<ul>\n  <li><i id=\"p_2\" class=\"pid\"></i>2022/01/06: Added <span class=\"snip\"><span style=\"color: #24292E\">getUntrackedFunds</span></span>.<a href=\"#p_2\" class=\"pid\">2</a></li>\n  <li><i id=\"p_3\" class=\"pid\"></i>2021/12/31: <span class=\"snip\"><span style=\"color: #24292E\">setQueryLowerBound</span></span> is deprecated.<a href=\"#p_3\" class=\"pid\">3</a></li>\n  <li><i id=\"p_4\" class=\"pid\"></i>2021/12/28: Algorand-only: The backend interface to compiled contract objects was updated, so you'll need to recompile for this release.<a href=\"#p_4\" class=\"pid\">4</a></li>\n  <li><i id=\"p_5\" class=\"pid\"></i>2021/12/23: Algorand-only: The backend interface to deployed contracts was updated, so old contracts will not work with this version.<a href=\"#p_5\" class=\"pid\">5</a></li>\n  <li><i id=\"p_6\" class=\"pid\"></i>2021/12/23: Added <span class=\"snip\"><span style=\"color: #24292E\">verifyMuldiv</span></span>.<a href=\"#p_6\" class=\"pid\">6</a></li>\n  <li><i id=\"p_7\" class=\"pid\"></i>2021/12/23: <span class=\"snip\"><span style=\"color: #24292E\">deploy</span></span> was renamed to <span class=\"snip\"><span style=\"color: #24292E\">init</span></span>.<a href=\"#p_7\" class=\"pid\">7</a></li>\n  <li><i id=\"p_8\" class=\"pid\"></i>2021/12/21: The backend interface to deployed contracts was updated, so old contracts will not work with this version.<a href=\"#p_8\" class=\"pid\">8</a></li>\n  <li><i id=\"p_9\" class=\"pid\"></i>2021/12/21: EVM-only: The backend interface to the compiled objects was updated, so you'll need to recompile for this release.<a href=\"#p_9\" class=\"pid\">9</a></li>\n  <li><i id=\"p_10\" class=\"pid\"></i>2021/12/20: Added support for <span class=\"snip\"><span style=\"color: #005CC5\">PAY_REQUIRE_EXPR</span></span>, which allows <span class=\"snip\"><span style=\"color: #24292E\">require</span></span> claims to be made about payments.<a href=\"#p_10\" class=\"pid\">10</a></li>\n  <li><i id=\"p_11\" class=\"pid\"></i>2021/12/16: Added <span class=\"snip\"><span style=\"color: #24292E\">Events</span></span>.<a href=\"#p_11\" class=\"pid\">11</a></li>\n  <li><i id=\"p_12\" class=\"pid\"></i>2021/12/16: The backend interface to the compiled objects was updated, so you'll need to recompile for this release.<a href=\"#p_12\" class=\"pid\">12</a></li>\n  <li><i id=\"p_13\" class=\"pid\"></i>2021/12/16: The backend interface to deployed contracts was updated, so old contracts will not work with this version.<a href=\"#p_13\" class=\"pid\">13</a></li>\n  <li><i id=\"p_14\" class=\"pid\"></i>2021/12/10: Added support for using Reach on Apple Silicon.<a href=\"#p_14\" class=\"pid\">14</a></li>\n  <li><i id=\"p_15\" class=\"pid\"></i>2021/11/25: The backend interface to the compiled objects was updated, so you'll need to recompile for this release.<a href=\"#p_15\" class=\"pid\">15</a></li>\n  <li><i id=\"p_16\" class=\"pid\"></i>2021/11/19: The backend interface to deployed contracts was updated, so old contracts will not work with this version.<a href=\"#p_16\" class=\"pid\">16</a></li>\n  <li><i id=\"p_17\" class=\"pid\"></i>2021/11/19: The backend interface to the compiled objects was updated, so you'll need to recompile for this release.<a href=\"#p_17\" class=\"pid\">17</a></li>\n  <li><i id=\"p_18\" class=\"pid\"></i>2021/11/17: Added <span class=\"snip\"><span style=\"color: #24292E\">ctc.unsafeViews</span></span> and <span class=\"snip\"><span style=\"color: #24292E\">ctc.safeApis</span></span>.<a href=\"#p_18\" class=\"pid\">18</a></li>\n  <li>\n    <i id=\"p_19\" class=\"pid\"></i>2021/11/15: Algorand connector now uses the application-controlled account for the escrow account.\n    This means that some programs will no longer work, if they do certain things, like trying to transfer non-network tokens in the same step that they share them with the consensus, because the contract needs to opt-in.\n    On the other hand, some things that used to not work, now do; for example, there used to be a limit of 15 extra transactions per consensus transfer, but now the limit is 31, with 15 from the client and 16 generated by the contract.<a href=\"#p_19\" class=\"pid\">19</a>\n  </li>\n  <li><i id=\"p_20\" class=\"pid\"></i>2021/11/15: Algorand-only: The backend interface to deployed contracts was updated, so old contracts will not work with this version.<a href=\"#p_20\" class=\"pid\">20</a></li>\n</ul>\n<h2 id=\"016-202110---202111\" class=\"refHeader\">0.1.6: 2021/10 - 2021/11<a aria-hidden=\"true\" tabindex=\"-1\" href=\"#016-202110---202111\"><span class=\"icon icon-link\"></span></a></h2>\n<p><i id=\"p_21\" class=\"pid\"></i>Version 0.1.6 is the current Reach release version.<a href=\"#p_21\" class=\"pid\">21</a></p>\n<ul>\n  <li><i id=\"p_22\" class=\"pid\"></i>2021/11/02: Allow <span class=\"snip\"><span style=\"color: #005CC5\">API</span></span>s and <span class=\"snip\"><span style=\"color: #24292E\">View</span></span>s to be specified without names.<a href=\"#p_22\" class=\"pid\">22</a></li>\n  <li><i id=\"p_23\" class=\"pid\"></i>2021/10/28: <code>REACH_CONNECTOR_MODE</code> no longer defaults to <code>ETH</code> when unset.<a href=\"#p_23\" class=\"pid\">23</a></li>\n</ul>\n<p><i id=\"p_24\" class=\"pid\"></i>Users are instead encouraged to run <a href=\"/tool/usage/#ref-usage-config\"><code>reach config</code></a> to set a persistent default in their shell or supply <code>REACH_CONNECTOR_MODE</code> explicitly at the command-line and in scripts.<a href=\"#p_24\" class=\"pid\">24</a></p>\n<p><i id=\"p_25\" class=\"pid\"></i>Attempting to <code>reach run|react|rpc-server|rpc-run|devnet</code> without setting <code>REACH_CONNECTOR_MODE</code> in one's terminal will result in an error message being shown and execution aborted.<a href=\"#p_25\" class=\"pid\">25</a></p>\n<ul>\n  <li><i id=\"p_26\" class=\"pid\"></i>2021/10/28: Added <a href=\"/tool/usage/#ref-usage-config\"><code>reach config</code> subcommand</a>.<a href=\"#p_26\" class=\"pid\">26</a></li>\n  <li><i id=\"p_27\" class=\"pid\"></i>2021/10/28: The backend interface to deployed contracts was updated, so old contracts will not work with this version.<a href=\"#p_27\" class=\"pid\">27</a></li>\n  <li><i id=\"p_28\" class=\"pid\"></i>2021/10/28: The backend interface to the compiled objects was updated, so you'll need to recompile for this release.<a href=\"#p_28\" class=\"pid\">28</a></li>\n  <li><i id=\"p_29\" class=\"pid\"></i>2021/10/20: Added <span class=\"snip\"><span style=\"color: #24292E\">decimals</span></span> field for token minting.<a href=\"#p_29\" class=\"pid\">29</a></li>\n  <li><i id=\"p_30\" class=\"pid\"></i>2021/10/18: Added APIs via the <span class=\"snip\"><span style=\"color: #005CC5\">API</span></span> form.<a href=\"#p_30\" class=\"pid\">30</a></li>\n  <li><i id=\"p_31\" class=\"pid\"></i>2021/10/15: The backend interface to deployed contracts was updated, so old contracts will not work with this version.<a href=\"#p_31\" class=\"pid\">31</a></li>\n  <li><i id=\"p_32\" class=\"pid\"></i>2021/10/15: The backend interface to the compiled objects was updated, so you'll need to recompile for this release.<a href=\"#p_32\" class=\"pid\">32</a></li>\n  <li><i id=\"p_33\" class=\"pid\"></i>2021/10/15: Algorand devnet updated to versions 3.0.1 and 2.6.4<a href=\"#p_33\" class=\"pid\">33</a></li>\n</ul>\n<h2 id=\"015-202109---202110\" class=\"refHeader\">0.1.5: 2021/09 - 2021/10<a aria-hidden=\"true\" tabindex=\"-1\" href=\"#015-202109---202110\"><span class=\"icon icon-link\"></span></a></h2>\n<p><i id=\"p_34\" class=\"pid\"></i>Version 0.1.5 is the current Reach release version.<a href=\"#p_34\" class=\"pid\">34</a></p>\n<ul>\n  <li><i id=\"p_35\" class=\"pid\"></i>2021/10/15: Added <span class=\"snip\"><span style=\"color: #24292E\">setValidQueryWindow</span></span>.<a href=\"#p_35\" class=\"pid\">35</a></li>\n  <li><i id=\"p_36\" class=\"pid\"></i>2021/10/11: The Solidity compiler has been upgraded to 0.8.9.<a href=\"#p_36\" class=\"pid\">36</a></li>\n  <li><i id=\"p_37\" class=\"pid\"></i>2021/10/08: The backend interface to the compiled objects was updated, so you'll need to recompile for this release.<a href=\"#p_37\" class=\"pid\">37</a></li>\n  <li><i id=\"p_38\" class=\"pid\"></i>2021/10/08: <span class=\"snip\"><span style=\"color: #24292E\">parallelReduce</span></span> is more strict in checking that the <code>msg</code> argument is present in the parameter list of <span class=\"snip\"><span style=\"color: #D73A49\">case</span></span> components, even when it is is bound to a <span class=\"snip\"><span style=\"color: #005CC5\">null</span></span>.<a href=\"#p_38\" class=\"pid\">38</a></li>\n  <li><i id=\"p_39\" class=\"pid\"></i>2021/10/08: Added <span class=\"snip\"><span style=\"color: #24292E\">getContract</span></span> and <span class=\"snip\"><span style=\"color: #24292E\">getAddress</span></span>.<a href=\"#p_39\" class=\"pid\">39</a></li>\n  <li><i id=\"p_40\" class=\"pid\"></i>2021/10/08: Added <span class=\"snip\"><span style=\"color: #24292E\">ctc.getContractAddress</span></span>.<a href=\"#p_40\" class=\"pid\">40</a></li>\n  <li><i id=\"p_41\" class=\"pid\"></i>2021/10/05: Added <span class=\"snip\"><span style=\"color: #24292E\">Contract</span></span>. Updated <span class=\"snip\"><span style=\"color: #24292E\">ctc.getInfo</span></span> to return a <span class=\"snip\"><span style=\"color: #24292E\">Contract</span></span>.<a href=\"#p_41\" class=\"pid\">41</a></li>\n  <li><i id=\"p_42\" class=\"pid\"></i>2021/10/04: Added <span class=\"snip\"><span style=\"color: #24292E\">unstrict</span></span>.<a href=\"#p_42\" class=\"pid\">42</a></li>\n  <li>\n    <i id=\"p_43\" class=\"pid\"></i>2021/09/25: Reach clients will detect that they are attempting to publish in a race that they cannot win and switch to listening for the publication of another.\n    This has the impact of frontends not being asked to sign transactions that cannot possibly succeed.<a href=\"#p_43\" class=\"pid\">43</a>\n  </li>\n  <li><i id=\"p_44\" class=\"pid\"></i>2021/09/25: Added <span class=\"snip\"><span style=\"color: #6F42C1\">didPublish</span><span style=\"color: #24292E\">()</span></span>.<a href=\"#p_44\" class=\"pid\">44</a></li>\n  <li><i id=\"p_45\" class=\"pid\"></i>2021/09/24: Contracts do not store the Merkleization of the state, but store the state itself; this changes the interface to contracts, so this release cannot communicate with DApps compiled by older versions of Reach.<a href=\"#p_45\" class=\"pid\">45</a></li>\n  <li><i id=\"p_46\" class=\"pid\"></i>2021/09/16: Bare integers used as time arguments will throw a deprecation warning. Use <span class=\"snip\"><span style=\"color: #24292E\">relativeTime</span></span> instead.<a href=\"#p_46\" class=\"pid\">46</a></li>\n  <li><i id=\"p_47\" class=\"pid\"></i>2021/09/16: The concept of deployment modes has been removed and the only available behavior is what was previously the <code>firstMsg</code> deployment mode.<a href=\"#p_47\" class=\"pid\">47</a></li>\n</ul>\n<p>\n  <i id=\"p_48\" class=\"pid\"></i>If you would like the old behavior, then you'll want to create a new participant, perhaps called <code>Constructor</code>, that exists simply to run <span class=\"snip\"><span style=\"color: #24292E\">Constructor.</span><span style=\"color: #6F42C1\">publish</span><span style=\"color: #24292E\">(); </span><span style=\"color: #6F42C1\">commit</span><span style=\"color: #24292E\">();</span></span>, but we expect that almost no one actually wants the old behavior exactly.\n  Instead, you probably want to select one of your existing participants and assign the first publication to them.<a href=\"#p_48\" class=\"pid\">48</a>\n</p>\n<ul>\n  <li><i id=\"p_49\" class=\"pid\"></i>2021/09/16: The backend interface to deployed contracts was updated, so old contracts will not work with this version.<a href=\"#p_49\" class=\"pid\">49</a></li>\n  <li><i id=\"p_50\" class=\"pid\"></i>2021/09/16: The backend interface to the compiled objects was updated, so you'll need to recompile for this release.<a href=\"#p_50\" class=\"pid\">50</a></li>\n</ul>\n<h2 id=\"014-202109---202109\" class=\"refHeader\">0.1.4: 2021/09 - 2021/09<a aria-hidden=\"true\" tabindex=\"-1\" href=\"#014-202109---202109\"><span class=\"icon icon-link\"></span></a></h2>\n<p><i id=\"p_51\" class=\"pid\"></i>Version 0.1.4 is is an old Reach release version.<a href=\"#p_51\" class=\"pid\">51</a></p>\n<ul>\n  <li><i id=\"p_52\" class=\"pid\"></i>2021/09/15: <span class=\"snip\"><span style=\"color: #24292E\">muldiv</span></span> added.<a href=\"#p_52\" class=\"pid\">52</a></li>\n  <li><i id=\"p_53\" class=\"pid\"></i>2021/09/08: Add <code>--stop-after-eval</code> and <code>--verify-timeout</code> options to <code>reach compile</code>.<a href=\"#p_53\" class=\"pid\">53</a></li>\n  <li><i id=\"p_54\" class=\"pid\"></i>2021/08/31: Removed <span class=\"snip\"><span style=\"color: #24292E\">getSignStrategy</span></span> and <span class=\"snip\"><span style=\"color: #24292E\">setSignStrategy</span></span> in favor of <span class=\"snip\"><span style=\"color: #24292E\">setWalletFallBack</span></span> and <span class=\"snip\"><span style=\"color: #24292E\">walletFallback</span></span>.<a href=\"#p_54\" class=\"pid\">54</a></li>\n  <li><i id=\"p_55\" class=\"pid\"></i>2021/08/31: Algorand devnet updated to versions 2.9.1 and 2.6.1<a href=\"#p_55\" class=\"pid\">55</a></li>\n  <li><i id=\"p_56\" class=\"pid\"></i>2021/08/31: The <code>reach</code> command-line has changed:<a href=\"#p_56\" class=\"pid\">56</a></li>\n  <li><i id=\"p_57\" class=\"pid\"></i>All subcommands now support <code>-h</code>/<code>--help</code> switches, e.g. <code>reach compile --help</code>.<a href=\"#p_57\" class=\"pid\">57</a></li>\n  <li><i id=\"p_58\" class=\"pid\"></i>The <code>APP</code> argument to <a href=\"/tool/usage/#ref-usage-init\"></a>has been removed.<a href=\"#p_58\" class=\"pid\">58</a></li>\n  <li><i id=\"p_59\" class=\"pid\"></i>The <code>reach</code> script now permits the use of subdirectories as arguments to certain subcommands, e.g. <code>reach compile dir/index.rsh</code>, but disallows parent directories (<code>..</code>) for reasons pertaining to Docker.<a href=\"#p_59\" class=\"pid\">59</a></li>\n  <li><i id=\"p_60\" class=\"pid\"></i>Devnets have been consolidated into a single Dockerized network and container topology.<a href=\"#p_60\" class=\"pid\">60</a></li>\n  <li><i id=\"p_61\" class=\"pid\"></i>The <code>--use-existing-devnet</code> flag has been deprecated and no longer has any effect.<a href=\"#p_61\" class=\"pid\">61</a></li>\n  <li>\n    <i id=\"p_62\" class=\"pid\"></i><a href=\"/tool/usage/#ref-usage-run\"></a>will now automatically connect to a given connector's devnet when already present.\n    Devnets which are not yet running will be launched as needed.<a href=\"#p_62\" class=\"pid\">62</a>\n  </li>\n  <li>\n    <i id=\"p_63\" class=\"pid\"></i><a href=\"/tool/usage/#ref-usage-down\"></a>now halts <em>ALL</em> Dockerized Reach containers and devnets (i.e. it's no longer specific to a single project).\n    Non-Reach Docker services are unaffected (see <a href=\"/tool/usage/#ref-usage-docker-reset\"></a>).<a href=\"#p_63\" class=\"pid\">63</a>\n  </li>\n  <li>\n    <i id=\"p_64\" class=\"pid\"></i><a href=\"/tool/usage/#ref-usage-docker-reset\"></a>now prompts the user for confirmation before continuing since it kills and removes <em>ALL</em> containers (not just those related to Reach).\n    The <code>-y</code> or <code>--even-non-reach</code> flags may be appended for non-interactive execution.<a href=\"#p_64\" class=\"pid\">64</a>\n  </li>\n  <li><i id=\"p_65\" class=\"pid\"></i>An <code>--await-background</code> flag has been introduced to the <a href=\"/tool/usage/#ref-usage-devnet\"></a>subcommand.<a href=\"#p_65\" class=\"pid\">65</a></li>\n  <li>\n    <i id=\"p_66\" class=\"pid\"></i>The <code>reach</code> script has been simplified such that <code>Makefile</code> and <code>docker-compose.yml</code> files are no longer integral to its function.\n    Accordingly, these files have been removed from <a href=\"/tool/usage/#ref-usage-scaffold\"></a>'s output.\n    Authors of existing projects which contain unmodified <code>Makefile</code> or <code>docker-compose.yml</code> files are encouraged to remove them.<a href=\"#p_66\" class=\"pid\">66</a>\n  </li>\n</ul>\n<h2 id=\"013-202107---202108\" class=\"refHeader\">0.1.3: 2021/07 - 2021/08<a aria-hidden=\"true\" tabindex=\"-1\" href=\"#013-202107---202108\"><span class=\"icon icon-link\"></span></a></h2>\n<p><i id=\"p_67\" class=\"pid\"></i>Version 0.1.3 is an old Reach release version.<a href=\"#p_67\" class=\"pid\">67</a></p>\n<ul>\n  <li><i id=\"p_68\" class=\"pid\"></i>2021/08/31: Added <span class=\"snip\"><span style=\"color: #24292E\">acc.setStorageLimit</span></span> to JavaScript standard library for Conflux.<a href=\"#p_68\" class=\"pid\">68</a></li>\n  <li><i id=\"p_69\" class=\"pid\"></i>2021/08/16: Allow <span class=\"snip\"><span style=\"color: #D73A49\">continue</span></span> in step in some cases.<a href=\"#p_69\" class=\"pid\">69</a></li>\n  <li><i id=\"p_70\" class=\"pid\"></i>2021/07/31: Added <span class=\"snip\"><span style=\"color: #24292E\">newTestAccounts</span></span>, <span class=\"snip\"><span style=\"color: #24292E\">waitUntilSecs</span></span>, and <span class=\"snip\"><span style=\"color: #24292E\">getNetworkSecs</span></span> to JavaScript standard library.<a href=\"#p_70\" class=\"pid\">70</a></li>\n  <li><i id=\"p_71\" class=\"pid\"></i>2021/07/31: Updated <span class=\"snip\"><span style=\"color: #24292E\">onProgress</span></span> type in JavaScript standard library.<a href=\"#p_71\" class=\"pid\">71</a></li>\n  <li><i id=\"p_72\" class=\"pid\"></i>2021/07/31: Added <span class=\"snip\"><span style=\"color: #24292E\">relativeTime</span></span>, <span class=\"snip\"><span style=\"color: #24292E\">absoluteTime</span></span>, <span class=\"snip\"><span style=\"color: #24292E\">relativeSecs</span></span>, <span class=\"snip\"><span style=\"color: #24292E\">absoluteSecs</span></span>, <span class=\"snip\"><span style=\"color: #24292E\">baseWaitTime</span></span>, <span class=\"snip\"><span style=\"color: #24292E\">baseWaitSecs</span></span>, and <span class=\"snip\"><span style=\"color: #24292E\">lastConsensusSecs</span></span> to Reach, with support in <span class=\"snip\"><span style=\"color: #24292E\">wait</span></span> and <span class=\"snip\"><span style=\"color: #24292E\">.timeout</span></span>.<a href=\"#p_72\" class=\"pid\">72</a></li>\n  <li><i id=\"p_73\" class=\"pid\"></i>2021/07/22: <span class=\"snip\"><span style=\"color: #6F42C1\">numberToFixedPoint</span><span style=\"color: #24292E\">()</span></span> and <span class=\"snip\"><span style=\"color: #6F42C1\">numberToInt</span><span style=\"color: #24292E\">()</span></span> added.<a href=\"#p_73\" class=\"pid\">73</a></li>\n  <li><i id=\"p_74\" class=\"pid\"></i>2021/07/21: Renamed Ethereum devnet Docker image to <code>devnet-eth</code>.<a href=\"#p_74\" class=\"pid\">74</a></li>\n  <li><i id=\"p_75\" class=\"pid\"></i>2021/07/21: Renamed connector modes to use naming convention <code>$NET-devnet</code>, rather than exposing implementation.<a href=\"#p_75\" class=\"pid\">75</a></li>\n  <li><i id=\"p_76\" class=\"pid\"></i>2021/07/21: Ethereum contract bytecode verification changed to directly compare deployment data<a href=\"#p_76\" class=\"pid\">76</a></li>\n  <li><i id=\"p_77\" class=\"pid\"></i>2021/07/20: <span class=\"snip\"><span style=\"color: #005CC5\">Array</span><span style=\"color: #24292E\">.</span><span style=\"color: #6F42C1\">slice</span><span style=\"color: #24292E\">()</span></span> added.<a href=\"#p_77\" class=\"pid\">77</a></li>\n  <li><i id=\"p_78\" class=\"pid\"></i>2021/07/19: <span class=\"snip\"><span style=\"color: #24292E\">Token.</span><span style=\"color: #6F42C1\">destroyed</span><span style=\"color: #24292E\">()</span></span> added.<a href=\"#p_78\" class=\"pid\">78</a></li>\n  <li><i id=\"p_79\" class=\"pid\"></i>2021/07/15: Ethereum contract info (i.e. <span class=\"snip\"><span style=\"color: #24292E\">ctc.</span><span style=\"color: #6F42C1\">getInfo</span><span style=\"color: #24292E\">()</span></span>) reduced to address only.<a href=\"#p_79\" class=\"pid\">79</a></li>\n  <li><i id=\"p_80\" class=\"pid\"></i>2021/07/14: Algorand contract info (i.e. <span class=\"snip\"><span style=\"color: #24292E\">ctc.</span><span style=\"color: #6F42C1\">getInfo</span><span style=\"color: #24292E\">()</span></span>) reduced to application id only.<a href=\"#p_80\" class=\"pid\">80</a></li>\n  <li><i id=\"p_81\" class=\"pid\"></i>2021/07/14: Minted tokens must be destroyed by end of application.<a href=\"#p_81\" class=\"pid\">81</a></li>\n  <li><i id=\"p_82\" class=\"pid\"></i>2021/07/14: Token minting support added to Algorand.<a href=\"#p_82\" class=\"pid\">82</a></li>\n  <li><i id=\"p_83\" class=\"pid\"></i>2021/07/14: Token URL metadata increased to 96 bytes.<a href=\"#p_83\" class=\"pid\">83</a></li>\n  <li><i id=\"p_84\" class=\"pid\"></i>2021/07/14: Algorand <span class=\"snip\"><span style=\"color: #24292E\">digest</span></span> switched to SHA256 (to save compute cost).<a href=\"#p_84\" class=\"pid\">84</a></li>\n  <li><i id=\"p_85\" class=\"pid\"></i>2021/07/14: Algorand connector updated to AVM 0.9 (TEAL version 4)<a href=\"#p_85\" class=\"pid\">85</a></li>\n  <li><i id=\"p_86\" class=\"pid\"></i>2021/07/14: Algorand devnet version updated to 2.7.1, plus <code>DevMode</code> patch<a href=\"#p_86\" class=\"pid\">86</a></li>\n  <li><i id=\"p_87\" class=\"pid\"></i>2021/07/14: Algorand devnet image renamed to <code>devnet-algo</code><a href=\"#p_87\" class=\"pid\">87</a></li>\n  <li><i id=\"p_88\" class=\"pid\"></i>2021/07/14: version tagged<a href=\"#p_88\" class=\"pid\">88</a></li>\n</ul>\n<h2 id=\"012-202009---202107\" class=\"refHeader\">0.1.2: 2020/09 - 2021/07<a aria-hidden=\"true\" tabindex=\"-1\" href=\"#012-202009---202107\"><span class=\"icon icon-link\"></span></a></h2>\n<p><i id=\"p_89\" class=\"pid\"></i>Version 0.1.2 is an old Reach release version.<a href=\"#p_89\" class=\"pid\">89</a></p>\n<p><i id=\"p_90\" class=\"pid\"></i>It is the last version that supports Algorand using TEAL3; if you deployed a contract on Algorand using Reach version 0.1.2, you will need to continue accessing it via the 0.1.2 version of the Reach standard library.<a href=\"#p_90\" class=\"pid\">90</a></p>\n<ul>\n  <li><i id=\"p_91\" class=\"pid\"></i>2021/07/09: <span class=\"snip\"><span style=\"color: #24292E\">.define</span></span> component added to <span class=\"snip\"><span style=\"color: #24292E\">parallelReduce</span></span><a href=\"#p_91\" class=\"pid\">91</a></li>\n  <li><i id=\"p_92\" class=\"pid\"></i>2021/07/08: <a href=\"/rsh/errors/#ref-error-codes\">Error code reference</a> created<a href=\"#p_92\" class=\"pid\">92</a></li>\n  <li><i id=\"p_93\" class=\"pid\"></i>2021/06/20: Token minting introduced, with implementation on ETH.<a href=\"#p_93\" class=\"pid\">93</a></li>\n  <li><i id=\"p_94\" class=\"pid\"></i>... many interesting things ...<a href=\"#p_94\" class=\"pid\">94</a></li>\n  <li><i id=\"p_95\" class=\"pid\"></i>2020/09/01: version tagged<a href=\"#p_95\" class=\"pid\">95</a></li>\n</ul>\n<h2 id=\"011-201909---202009\" class=\"refHeader\">0.1.1: 2019/09 - 2020/09<a aria-hidden=\"true\" tabindex=\"-1\" href=\"#011-201909---202009\"><span class=\"icon icon-link\"></span></a></h2>\n<p><i id=\"p_96\" class=\"pid\"></i>Version 0.1.1 was used prior to our documented release process.<a href=\"#p_96\" class=\"pid\">96</a></p>\n<h2 id=\"010-201909---202009\" class=\"refHeader\">0.1.0: 2019/09 - 2020/09<a aria-hidden=\"true\" tabindex=\"-1\" href=\"#010-201909---202009\"><span class=\"icon icon-link\"></span></a></h2>\n<p><i id=\"p_97\" class=\"pid\"></i>Version 0.1.0 was used prior to our documented release process.<a href=\"#p_97\" class=\"pid\">97</a></p>","<ul><li class=\"dynamic\">\n    <a href=\"#guide-changelog\">Changelog</a>\n    <ul class=\"dynamic\">\n      <li class=\"dynamic\"><a href=\"#017-202111---present\">0.1.7: 2021/11 - present</a></li>\n      <li class=\"dynamic\"><a href=\"#016-202110---202111\">0.1.6: 2021/10 - 2021/11</a></li>\n      <li class=\"dynamic\"><a href=\"#015-202109---202110\">0.1.5: 2021/09 - 2021/10</a></li>\n      <li class=\"dynamic\"><a href=\"#014-202109---202109\">0.1.4: 2021/09 - 2021/09</a></li>\n      <li class=\"dynamic\"><a href=\"#013-202107---202108\">0.1.3: 2021/07 - 2021/08</a></li>\n      <li class=\"dynamic\"><a href=\"#012-202009---202107\">0.1.2: 2020/09 - 2021/07</a></li>\n      <li class=\"dynamic\"><a href=\"#011-201909---202009\">0.1.1: 2019/09 - 2020/09</a></li>\n      <li class=\"dynamic\"><a href=\"#010-201909---202009\">0.1.0: 2019/09 - 2020/09</a></li>\n    </ul>\n  </li></ul>"]